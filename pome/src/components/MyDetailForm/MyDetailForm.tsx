import React from "react";
import DetailForm, { DetailFormProps } from "../DetailForm/DetailForm";
import { useNavigate } from "react-router-dom";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import { hasComment } from "../../constants/comments";

type MyDetailFormProps = Omit<DetailFormProps, "onChange">;

export default function MyDetailForm(props: MyDetailFormProps) {
  const { category, value, isEditing, ...rest } = props;
  const navigate = useNavigate();

  const fields = CATEGORY_FIELDS[category];

  const commentedFields = fields
    .filter((f) => hasComment(category, f.name, value?.blockId))
    .map((f) => f.name);

  const handleFieldClick = (fieldName: string) => {
    if (!value) return;

    navigate(`/my/detail/${category}/${value.blockId}/${fieldName}`);
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