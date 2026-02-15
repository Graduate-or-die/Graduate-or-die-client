import React from "react";
import * as S from "./LoginPage.style";
import { KakaoImg } from "../../assets";
import { PomeLogo } from "../../icons";
import { getLogin } from "../../apis/login";

export default function LoginPage() {
  function handleLogin() {
    getLogin();
  }
  return (
    <>
      <S.PomeContainer>
        <PomeLogo width={100} height={46} />
        <S.PomeBox>Portfolio with Mate</S.PomeBox>
      </S.PomeContainer>
      <S.KakaoContainer onClick={handleLogin}>
        <img src={KakaoImg} width={22} height={22} alt="" />
        <S.KakaoBox>Kakao로 시작하기</S.KakaoBox>
      </S.KakaoContainer>
    </>
  );
}
