import React from "react";
import DetailForm, { DetailFormProps } from "../DetailForm/DetailForm";
import { useNavigate } from "react-router-dom";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import { hasComment } from "../../constants/comments";

type MyDetailFormProps = Omit<DetailFormProps, "onChange">;
export default function MyDetailForm(props: MyDetailFormProps) {
  const { category, value, isEditing, ...rest } = props;
  const navigate = useNavigate();

  const fields = CATEGORY_FIELDS[category];
  const commentedFields = fields
    .filter((f) => hasComment(category, f.name, value?.id))
    .map((f) => f.name);

  const SINGLE_CATEGORIES: CategoryKey[] = ["education", "etc"];

  const handleFieldClick = (fieldName: string) => {
    if (!value) return;

    if (SINGLE_CATEGORIES.includes(category)) {
      navigate(`/my/detail/${category}/${fieldName}`);
    } else {
      navigate(`/my/detail/${category}/${value.id}/${fieldName}`);
    }
  };

  return (
    <DetailForm
      {...props}
      isEditing={isEditing}
      onChange={() => {}}
      {...rest}
      onFieldClick={handleFieldClick}
      commentedFields={commentedFields}
      isMyPage={true}
      showAttachButton={false}
    />
  );
}
