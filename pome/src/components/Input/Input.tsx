import React, { useRef } from "react";
import * as S from "./Input.style";
import { Send } from "../../icons";
type InputProps = {
  value: string;
  onSubmit: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function Input(
  { value, onSubmit, onChange, placeholder }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value);

    if (ref && typeof ref !== "function") {
      ref.current?.focus();
    }
  };

  return (
    <>
      <S.InputContainer>
        <S.InputRow>
          <S.InputBox
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
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
export default React.forwardRef<HTMLInputElement, InputProps>(Input);
