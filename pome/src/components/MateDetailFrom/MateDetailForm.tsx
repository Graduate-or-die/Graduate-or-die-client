import React from "react";
import DetailForm, { DetailFormProps } from "../DetailForm/DetailForm";
import { useNavigate } from "react-router-dom";
type MateDetailFormProps = Omit<DetailFormProps, "onChange"> & {
  mateId: number | null;
};

export default function MateDetailForm(props: MateDetailFormProps) {
  const { category, value, isEditing, mateId, ...rest } = props;
  const navigate = useNavigate();

  const handleFieldClick = (fieldKey: string, blockId: number) => {
    navigate(`/mate/detail/${category}/${blockId}/${fieldKey}`, {
      state: { mateId },
    });
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
