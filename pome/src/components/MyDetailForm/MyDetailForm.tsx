import React from "react";
import DetailForm, { DetailFormProps } from "../DetailForm/DetailForm";
import { useNavigate } from "react-router-dom";

type MyDetailFormProps = Omit<DetailFormProps, "onChange">;

export default function MyDetailForm(props: MyDetailFormProps) {
  const { category, value, isEditing, ...rest } = props;
  const navigate = useNavigate();

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
      isMyPage={true}
      showAttachButton={false}
    />
  );
}
