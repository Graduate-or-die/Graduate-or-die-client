import React, { useRef, useState } from "react";
import * as S from "./DetailForm.style";
import { CATEGORIES, CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS, Field } from "../../constants/categoryFields";
import { Link, Check, SelectCheck, Plus, RedDot } from "../../icons";
import { DetailItem } from "../../types/detail";
import { hasComment } from "../../constants/comments";

export type DetailFormProps = {
  category: CategoryKey;
  value: DetailItem | null;
  onChange?: (v: DetailItem) => void;
  isEditing: boolean;
  isBase?: boolean;
  isSelectMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onFieldClick?: (fieldName: string) => void;
  commentedFields?: string[];
};

export default function DetailForm({
  category,
  value,
  onChange,
  isEditing,
  isBase = false,
  isSelectMode,
  isSelected,
  onToggleSelect,
  onFieldClick,
  commentedFields,
}: DetailFormProps) {
  const fields = CATEGORY_FIELDS[category];
  const isEducation = category === "education";

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [exprDisabled, setExprDisabled] = useState<Record<string, boolean>>({});

  if (!value) return null;
  const safeValue = value;
  const links = Array.isArray(safeValue.content) ? safeValue.content : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value: inputValue } = e.target;
    onChange?.({
      ...safeValue,
      [name]: inputValue,
    });
  };

  const handleFileClick = () => {
    if (!isEditing) return;
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    onChange?.({
      ...safeValue,
      [e.target.name]: file,
    });
  };

  const toggleExpr = (name: string) => {
    if (!isEditing) return;
    const currentlyDisabled = exprDisabled[name] ?? safeValue[name] === null;

    setExprDisabled((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    onChange?.({
      ...safeValue,
      [name]: currentlyDisabled ? "" : null,
    });
  };

  const handleLinkAdd = () => {
    if (!isEditing) return;
    const currentLinks = Array.isArray(safeValue.content)
      ? safeValue.content
      : [];
    if (currentLinks.length >= 4) return;
    const { comments, ...rest } = safeValue;
    onChange?.({
      ...rest,
      content: [...currentLinks, ""],
    });
  };

  const handleLinkChange = (index: number, newValue: string) => {
    const currentLinks = Array.isArray(safeValue.content)
      ? safeValue.content
      : [];
    const next = [...currentLinks];
    next[index] = newValue;
    const { comments, ...rest } = safeValue;
    onChange?.({ ...rest, content: next });
  };

  const savedLinks = (safeValue.links ?? [])
    .map((l) => l.trim())
    .filter(Boolean);

  const renderLinks = (() => {
    if (isEditing && savedLinks.length === 0) {
      return [""];
    }

    if (isEditing && savedLinks.length < 4) {
      return [...savedLinks, ""];
    }

    return savedLinks;
  })();

  const Container = isEducation ? S.EduContainer : React.Fragment;
  const FormBoxContainer = isEducation ? S.EduFormContainer : S.FormContainer;

  const renderField = (field: Field) => {
    const rawValue = safeValue[field.name];
    const inputValue: string | number | readonly string[] | undefined =
      typeof rawValue === "string" ||
      typeof rawValue === "number" ||
      Array.isArray(rawValue)
        ? rawValue
        : undefined;

    const showRedDot = hasComment(category, field.name, value.id);

    
    return (
      <S.FormRow key={field.name}>
        <S.FormLabel>
          {field.label}
          {showRedDot && (
            <S.RedDotBox>
              <RedDot />
            </S.RedDotBox>
          )}
        </S.FormLabel>

        {field.kind === "period" ? (
          <S.PeriodBox>
            <S.DateBox
              name="periodStart"
              value={(safeValue.periodStart as string) || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              onClick={() => {
                if (!isEditing) {
                  onFieldClick?.(field.name);
                }
              }}
            />
            <span>~</span>
            <S.DateBox
              name="periodEnd"
              value={(safeValue.periodEnd as string) || ""}
              onChange={handleChange}
              readOnly={!isEditing || exprDisabled[field.name]}
              onClick={() => {
                if (!isEditing) {
                  onFieldClick?.(field.name);
                }
              }}
            />
          </S.PeriodBox>
        ) : field.kind === "textarea" ? (
          <S.FormBoxArea
            name={field.name}
            value={inputValue}
            onChange={handleChange}
            readOnly={!isEditing}
            onClick={() => {
              if (!isEditing) {
                onFieldClick?.(field.name);
              }
            }}
          />
        ) : field.kind === "file" ? (
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
                value={fileName}
                placeholder="파일을 첨부하세요"
                readOnly
              />
              <S.AttachButton
                type="button"
                onClick={handleFileClick}
                disabled={!isEditing}
              >
                첨부
              </S.AttachButton>
            </S.FileContainer>
          </>
        ) : field.kind === "memo" ? (
          <S.Memo
            name={field.name}
            value={inputValue}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        ) : field.kind === "expr" ? (
          <>
            <S.FormBox
              name={field.name}
              value={inputValue}
              onChange={handleChange}
              readOnly={
                !isEditing ||
                exprDisabled[field.name] ||
                safeValue[field.name] === null
              }
              disabledTone={
                exprDisabled[field.name] || safeValue[field.name] === null
              }
              onClick={() => {
                if (!isEditing) {
                  onFieldClick?.(field.name);
                }
              }}
            />
            <S.CheckContainer onClick={() => toggleExpr(field.name)}>
              {safeValue[field.name] === null || exprDisabled[field.name] ? (
                <Check />
              ) : (
                <S.CheckBox />
              )}
              <S.CheckFont>만료 일자 없음</S.CheckFont>
            </S.CheckContainer>
          </>
        ) : field.kind === "link" ? (
          <>
            {Array.isArray(safeValue.content) &&
              safeValue.content.map((link, index) => (
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
            {Array.isArray(safeValue.content) &&
              links.length < 4 &&
              isEditing && (
                <S.LinkAdd>
                  <Plus
                    style={{ color: "#0086AB" }}
                    onClick={() => handleLinkAdd()}
                  />
                </S.LinkAdd>
              )}
          </>
        ) : (
          <S.FormBox
            name={field.name}
            value={inputValue}
            onChange={handleChange}
            gray={isEducation || field.group === "education"}
            readOnly={!isEditing}
            onClick={() => {
              if (!isEditing) {
                onFieldClick?.(field.name);
              }
            }}
          />
        )}
      </S.FormRow>
    );
  };

  return (
    <>
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
    </>
  );
}
