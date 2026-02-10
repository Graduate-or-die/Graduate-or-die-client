import React from "react";
import DetailForm, { DetailFormProps } from "../DetailForm/DetailForm";
import { useNavigate } from "react-router-dom";
import { CategoryKey } from "../../constants/categories";
type MateDetailFormProps = Omit<DetailFormProps, "onChange">;

export default function MateDetailForm(props: MateDetailFormProps) {
  const { category, value, isEditing, ...rest } = props;
  const navigate = useNavigate();

  const SINGLE_CATEGORIES: CategoryKey[] = ["education", "etc"];

  const handleFieldClick = (fieldName: string) => {
    if (!value) return;

    if (SINGLE_CATEGORIES.includes(category)) {
      navigate(`/mate/detail/${category}/${fieldName}`);
    } else {
      navigate(`/mate/detail/${category}/${value.id}/${fieldName}`);
    }
  };

  return (
    <DetailForm
      {...props}
      isEditing={isEditing}
      onChange={() => {}}
      {...rest}
      onFieldClick={handleFieldClick}
      showAttachButton={false}
    />
  );
}
