import React from "react";
import * as S from "./Input.style";
import { Send } from "../../icons";

type InputProps = {
  value: string;
  onSubmit: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onSubmit, onChange, placeholder }, ref) => {
    
    const handleSubmit = () => {
      if (!value.trim()) return;

      onSubmit(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };

    const handleClick = () => {
      handleSubmit();
    };

    return (
      <S.InputContainer>
        <S.InputRow>
          <S.InputBox
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />

          <S.SendIconBox onClick={handleClick}>
            <Send />
          </S.SendIconBox>
        </S.InputRow>
      </S.InputContainer>
    );
  }
);

export default Input;