import React from "react";
import * as S from "./RecommendHeader.style";
import { Alarm, PomeLogo, Friends } from "../../icons";
import { useNavigate } from "react-router-dom";
export default function RecommendHeader() {
  return (
    <>
      <S.Header>
        <S.HeaderBox>
          <S.EmptyBox />
          <PomeLogo />
          <S.IconBox>
            <Friends />
            <Alarm />
          </S.IconBox>
        </S.HeaderBox>
      </S.Header>
    </>
  );
}
