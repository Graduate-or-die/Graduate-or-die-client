import React from "react";
import * as S from "./MateMatch.style";
import { PomeOn, Close } from "../../icons";
import { useNavigate } from "react-router-dom";
import { MateMatchFont, MatchEffect } from "../../assets";
import "animate.css/animate.min.css";
export default function MateMatchPage() {
  const navigate = useNavigate();
  return (
    <>
      <S.PageContainer>
        <S.CloseButton>
          <Close onClick={() => navigate("/mate")} />
        </S.CloseButton>
        <S.MatchWrapper>
          <S.MateMatchContainer>
            <S.MateMatchBox>
              <img src={MateMatchFont} />
            </S.MateMatchBox>
          </S.MateMatchContainer>
          <S.IconContainer>
            <S.MatchEffectImg src={MatchEffect} />
            <S.PomeContainer>
              <S.PomeEffect>
                <S.PomeLeft>
                  <PomeOn />
                </S.PomeLeft>
              </S.PomeEffect>
              <S.PomeEffect>
                <PomeOn />
              </S.PomeEffect>
            </S.PomeContainer>
          </S.IconContainer>
          <S.MatchPhrase>매칭이 성공적으로 완료되었습니다.</S.MatchPhrase>
        </S.MatchWrapper>
      </S.PageContainer>
    </>
  );
}
