import React, { useRef, useState, useEffect, useMemo } from "react";
import * as S from "./DetailForm.style";
import { CATEGORIES, CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS, Field } from "../../constants/categoryFields";
import { Link, Check, SelectCheck, Plus, RedDot, Delete } from "../../icons";
import { EtcItem, DetailItem } from "../../types/detail";
import { getFileDownload } from "../../apis/portfolio";

export type DetailFormProps = {
  category: CategoryKey;
  value: DetailItem | null;
  onChange?: (v: DetailItem) => void;
  onDeleteFile?: (blockId: number) => void;
  isEditing: boolean;
  isBase?: boolean;
  isSelectMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onFieldClick?: (fieldName: string) => void;
  isMyPage?: boolean;
  showAttachButton?: boolean;
  unreadMap?: Set<string>;
};

export default function DetailForm({
  category,
  value,
  onChange,
  onDeleteFile,
  isEditing,
  isBase = false,
  isSelectMode,
  isSelected,
  onToggleSelect,
  onFieldClick,
  isMyPage = false,
  showAttachButton = true,
  unreadMap,
}: DetailFormProps) {
  const fields = CATEGORY_FIELDS[category];
  const isEducation = category === "education";

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const safeValue = useMemo(() => value ?? ({} as DetailItem), [value]);

  const isEtcItem = (item: DetailItem): item is EtcItem => "link" in item;
  const links =
    isEtcItem(safeValue) && Array.isArray(safeValue.link) ? safeValue.link : [];
  const visibleLinkCount = links.filter((l) => l.trim() !== "").length;
  const attachmentId = (safeValue as any).file?.fileId;

  useEffect(() => {
    const file = (safeValue as any).file;
    if (file?.originalFileName) setFileName(file.originalFileName);
  }, [safeValue]);

  const getFieldValue = (name: string) => (safeValue as any)[name] ?? "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value: inputValue } = e.target;
    onChange?.({ ...safeValue, [name]: inputValue } as DetailItem);
  };

  const handleFileClick = () => isEditing && fileRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    onChange?.({ ...safeValue, [e.target.name]: file } as DetailItem);
  };

  const handleFileDelete = () => {
    const blockId = (safeValue as any).blockId;
    if (blockId && onDeleteFile) onDeleteFile(blockId);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
    onChange?.({ ...safeValue, file: null } as DetailItem);
  };

  const handleDownload = async (attachmentId: number, fileName: string) => {
    try {
      const res = await getFileDownload(attachmentId);
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleExpr = (fieldName: string) => {
    if (!isEditing) return;
    const hasEndAt = (safeValue as any).hasQualificationEndAt ?? true;
    const newHasEndAt = !hasEndAt;
    const updatedValue: any = {
      ...safeValue,
      hasQualificationEndAt: newHasEndAt,
      qualificationEndAt: newHasEndAt
        ? getFieldValue("qualificationEndAt")
        : null,
    };
    onChange?.(updatedValue);
  };

  const handleLinkAdd = () => {
    if (!isEditing || !isEtcItem(safeValue) || visibleLinkCount >= 4) return;
    onChange?.({ ...safeValue, link: [...(safeValue.link ?? []), ""] });
  };

  const handleLinkChange = (index: number, newValue: string) => {
    if (!isEtcItem(safeValue)) return;
    const nextLinks = [...(safeValue.link ?? [])];
    nextLinks[index] = newValue;
    onChange?.({ ...safeValue, link: nextLinks });
  };

  const getPeriodFieldNames = (category: CategoryKey) => {
    switch (category) {
      case "experience":
        return { start: "experienceStartAt", end: "experienceEndAt" };
      case "activity":
        return { start: "activityStartAt", end: "activityEndAt" };
      case "project":
        return { start: "projectStartAt", end: "projectEndAt" };
      default:
        return { start: "periodStart", end: "periodEnd" };
    }
  };

  const renderPeriodField = (field: Field) => {
    const { start, end } = getPeriodFieldNames(category);
    const startValue = getFieldValue(start);
    const endValue = getFieldValue(end);
    const startReadOnly = !isEditing || startValue === null;
    const endReadOnly = !isEditing || endValue === null;

    return (
      <S.PeriodBox onClick={() => !isEditing && onFieldClick?.("period")}>
        <S.DateBox
          name={start}
          value={startValue ?? ""}
          onChange={handleChange}
          readOnly={startReadOnly}
        />
        <span>~</span>
        <S.DateBox
          name={end}
          value={endValue ?? ""}
          onChange={handleChange}
          readOnly={endReadOnly}
        />
      </S.PeriodBox>
    );
  };

  const renderFileField = (field: Field) => (
    <>
      <S.FileBox
        type="file"
        name={field.name}
        ref={fileRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <S.FileContainer>
        <S.FileNameBox
          onClick={() => {
            if (!fileName && fileRef.current) fileRef.current.click();
            else if (fileName && attachmentId)
              handleDownload(attachmentId, fileName);
          }}
        >
          {fileName || "파일을 첨부하세요"}
        </S.FileNameBox>
        {showAttachButton &&
          fileName &&
          ["qualification", "award"].includes(category) && (
            <S.DeleteBox onClick={handleFileDelete}>
              <Delete />
            </S.DeleteBox>
          )}
        {showAttachButton && (
          <S.AttachButton
            type="button"
            onClick={handleFileClick}
            disabled={!isEditing}
          >
            첨부
          </S.AttachButton>
        )}
      </S.FileContainer>
    </>
  );

  const renderExprField = (field: Field) => {
    const hasEndAt = (safeValue as any).hasQualificationEndAt ?? true;
    const value = hasEndAt ? getFieldValue(field.name) : null;
    const isDisabled = !hasEndAt;

    return (
      <>
        <S.FormBox
          name={field.name}
          value={value ?? ""}
          onChange={handleChange}
          disabledTone={isDisabled}
          readOnly={!isEditing || isDisabled}
        />
        <S.CheckContainer onClick={() => toggleExpr(field.name)}>
          {isDisabled ? <Check /> : <S.CheckBox />}
          <S.CheckFont>만료 일자 없음</S.CheckFont>
        </S.CheckContainer>
      </>
    );
  };

  const renderLinkField = (field: Field) => (
    <>
      {isEtcItem(safeValue) &&
        links.map((link, index) => (
          <S.LinkContainer key={index}>
            <S.LinkIcon>
              <Link />
            </S.LinkIcon>
            <S.LinkBox
              value={link}
              onChange={
                isEditing
                  ? (e) => handleLinkChange(index, e.target.value)
                  : undefined
              }
              disabled={!isEditing}
            />
          </S.LinkContainer>
        ))}
      {isEtcItem(safeValue) && visibleLinkCount < 4 && isEditing && (
        <S.LinkAdd>
          <Plus style={{ color: "#0086AB" }} onClick={handleLinkAdd} />
        </S.LinkAdd>
      )}
    </>
  );

  const renderField = (field: Field) => {
    const inputValue = getFieldValue(field.name);

    const typeIdMap: Record<CategoryKey, number> = {
      education: 1,
      experience: 2,
      activity: 3,
      award: 4,
      qualification: 5,
      project: 6,
      etc: 7,
    };

    const typeId = typeIdMap[category];
    const blockId = (value as any)?.blockId;
    const isPeriodField = field.kind === "period";

    const showRedDot =
      isMyPage &&
      unreadMap &&
      typeof blockId === "number" &&
      (isPeriodField
        ? unreadMap.has(`${typeId}-${blockId}-period`)
        : unreadMap.has(`${typeId}-${blockId}-${field.name}`));

    const isDisabled =
      !isEditing ||
      (field.kind === "expr" && !(safeValue as any).hasQualificationEndAt);

    return (
      <S.FormRow
        key={field.name}
        onClick={() => {
          if (!isEditing) {
            if (field.name === "file") return;
            if (field.kind === "period") {
              onFieldClick?.("period");
            } else {
              onFieldClick?.(field.name);
            }
          }
        }}
      >
        <S.FormLabel>
          {field.label}
          {showRedDot && (
            <S.RedDotBox>
              <RedDot />
            </S.RedDotBox>
          )}
        </S.FormLabel>

        {field.kind === "period" ? (
          renderPeriodField(field)
        ) : field.kind === "textarea" ? (
          <S.FormBoxArea
            name={field.name}
            value={inputValue ?? ""}
            onChange={handleChange}
            readOnly={isDisabled}
          />
        ) : field.kind === "file" ? (
          renderFileField(field)
        ) : field.kind === "memo" ? (
          <S.Memo
            name={field.name}
            value={inputValue ?? ""}
            onChange={handleChange}
            readOnly={isDisabled}
          />
        ) : field.kind === "expr" ? (
          renderExprField(field)
        ) : field.kind === "link" ? (
          renderLinkField(field)
        ) : (
          <S.FormBox
            name={field.name}
            value={inputValue ?? ""}
            onChange={handleChange}
            gray={isEducation || field.group === "education"}
            readOnly={isDisabled}
          />
        )}
      </S.FormRow>
    );
  };

  const Container = isEducation ? S.EduContainer : React.Fragment;
  const FormBoxContainer = isEducation ? S.EduFormContainer : S.FormContainer;

  return (
    <Container>
      <FormBoxContainer>
        <S.FormHeader>
          <S.FormName>{CATEGORIES[category]}</S.FormName>
          {isSelectMode && (
            <S.SelectCircle
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect?.();
              }}
            >
              {isSelected && <SelectCheck />}
            </S.SelectCircle>
          )}
        </S.FormHeader>

        {fields.map(renderField)}
      </FormBoxContainer>
    </Container>
  );
}