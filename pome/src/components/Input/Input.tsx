import React, { useState } from "react";
import * as S from "./Input.style";
import { Send } from "../../icons";
type InputProps = {
  onSubmit: (value: string) => void;
  placeholder?: string;
};

export default function Input({ onSubmit, placeholder }: InputProps) {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <>
      <S.InputContainer>
        <S.InputRow>
          <S.InputBox
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <S.SendIconBox onClick={handleSubmit}>
            <Send />
          </S.SendIconBox>
        </S.InputRow>
      </S.InputContainer>
    </>
  );
}
