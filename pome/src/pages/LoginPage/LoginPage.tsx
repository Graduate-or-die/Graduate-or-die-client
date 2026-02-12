import React from "react";
import * as S from "./LoginPage.style";
import { KakaoImg } from "../../assets";
import { useNavigate } from "react-router-dom";
import { PomeLogo } from "../../icons";
export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <S.PomeContainer>
        <PomeLogo width={100} height={46} />
        <S.PomeBox>Portfolio with Mate</S.PomeBox>
      </S.PomeContainer>
      <S.KakaoContainer>
        <img src={KakaoImg} width={22} height={22} alt="" />
        <S.KakaoBox>Kakao로 시작하기</S.KakaoBox>
      </S.KakaoContainer>
    </>
  );
}
