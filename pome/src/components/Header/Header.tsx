import React from "react";
import * as S from "./Header.style";
import { Alarm, ArrowLeft, PomeLogo } from "../../icons";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <S.Header>
        <S.HeaderBox>
          <button onClick={goBack}>
            <ArrowLeft/>
          </button>
          <PomeLogo />
          <Alarm />
        </S.HeaderBox>
      </S.Header>
    </>
  );
}
