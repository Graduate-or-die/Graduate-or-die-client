import React from "react";
import * as S from "./ChatHeader.style";
import { ArrowLeft } from "../../icons";
import { useNavigate } from "react-router-dom";
export default function ChatHeader() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <S.ChatHeader>
        <S.ChatHeaderBox>
          <S.LeftBox>
            <button onClick={goBack}>
              <ArrowLeft />
            </button>
            Mate
          </S.LeftBox>
        </S.ChatHeaderBox>
      </S.ChatHeader>
    </>
  );
}
