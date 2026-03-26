import React from "react";
import * as S from "./RecommendHeader.style";
import { PomeLogo, Friends } from "../../icons";
import { useNavigate } from "react-router-dom";
export default function RecommendHeader() {
  const navigate = useNavigate();

  return (
    <>
      <S.Header>
        <S.HeaderBox>
          <S.EmptyBox />
          <PomeLogo />
          <S.IconBox>
            <Friends onClick={() => navigate("/request")} />
          </S.IconBox>
        </S.HeaderBox>
      </S.Header>
    </>
  );
}
