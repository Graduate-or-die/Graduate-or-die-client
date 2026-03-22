import React from "react";
import DetailForm, { DetailFormProps } from "../DetailForm/DetailForm";
import { useNavigate } from "react-router-dom";
import { CategoryKey } from "../../constants/categories";
type MateDetailFormProps = Omit<DetailFormProps, "onChange">;

export default function MateDetailForm(props: MateDetailFormProps) {
  const { category, value, isEditing, ...rest } = props;
  const navigate = useNavigate();

  const handleFieldClick = (fieldKey: string, blockId: number) => {
    navigate(`/mate/detail/${category}/${blockId}/${fieldKey}`);
  };

  return (
    <DetailForm
      {...props}
      isEditing={isEditing}
      onChange={() => {}}
      {...rest}
      onFieldClick={(fieldKey) => {
        if (!value?.blockId) return;
        handleFieldClick(fieldKey, value.blockId);
      }}
      showAttachButton={false}
    />
  );
}
