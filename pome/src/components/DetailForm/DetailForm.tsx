import React, { useRef, useState } from "react";
import * as S from "./DetailForm.style";
import { CATEGORIES, CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS, Field } from "../../constants/categoryFields";
import { Link, Check } from "../../icons";
type DetailFormProps = {
  category: CategoryKey;
};

export default function DetailForm({ category }: DetailFormProps) {
  const fields = CATEGORY_FIELDS[category];

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const educationFields = fields.filter((f) => f.group === "education");
  const experienceFields = fields.filter((f) => f.group === "experience");
  const [exprDisabled, setExprDisabled] = useState<Record<string, boolean>>({});
  const toggleExpr = (name: string) => {
    setExprDisabled((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderField = (field: Field) => (
    <S.FormRow key={field.name}>
      <S.FormLabel>{field.label}</S.FormLabel>

      {field.kind === "period" ? (
        <S.PeriodBox>
          <S.DateBox name={`${field.name}Start`} />
          <span>~</span>
          <S.DateBox name={`${field.name}End`} />
        </S.PeriodBox>
      ) : field.kind === "textarea" ? (
        <S.FormBoxArea name={field.name} />
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
            <S.AttachButton type="button" onClick={handleFileClick}>
              첨부
            </S.AttachButton>
          </S.FileContainer>
        </>
      ) : field.kind === "memo" ? (
        <S.Memo name={field.name} />
      ) : field.kind === "expr" ? (
        <>
          <S.FormBox
            name={field.name}
            disabled={exprDisabled[field.name]}
            disabledTone={exprDisabled[field.name]}
          />
          <S.CheckContainer onClick={() => toggleExpr(field.name)}>
            {!exprDisabled[field.name] && <S.CheckBox />}
            {exprDisabled[field.name] && <Check />}
            <S.CheckFont>만료 일자 없음</S.CheckFont>
          </S.CheckContainer>
        </>
      ) : field.kind === "link" ? (
        <>
          <S.LinkContainer>
            <S.LinkIcon>
              <Link />
            </S.LinkIcon>

            <S.LinkBox name={field.name} />
          </S.LinkContainer>
        </>
      ) : (
        <S.FormBox name={field.name} gray={field.group === "education"} />
      )}
    </S.FormRow>
  );

  return (
    <>
      {category === "education" ? (
        <S.EduContainer>
          <S.EduFormContainer>
            <S.FormName>학력</S.FormName>
            {educationFields.map(renderField)}
          </S.EduFormContainer>

          <S.FormContainer>
            <S.FormName>경력</S.FormName>
            {experienceFields.map(renderField)}
          </S.FormContainer>
        </S.EduContainer>
      ) : (
        <S.FormContainer>
          <S.FormName>{CATEGORIES[category]}</S.FormName>
          {fields.map(renderField)}
        </S.FormContainer>
      )}
    </>
  );
}
