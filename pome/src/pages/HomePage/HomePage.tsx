import React from "react";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Menu from "../../components/Menu";
import HomeBadge from "../../components/HomeBadge";
import * as S from "./HomePage.style";
import { Star } from "../../icons";

export default function HomePage() {
  return (
    <>
      <S.PageWrapper>
        <Header />
        <S.ContentWrapper>
          <S.HomeMenu>
            <Menu />
          </S.HomeMenu>
          <S.AiTagContainer>
            <S.AiTagBox>
              <Star />
              AI 기반 생성 태그
            </S.AiTagBox>
            <HomeBadge label="대회마스터" />
            <HomeBadge label="프론트엔드개발자" />
          </S.AiTagContainer>
        </S.ContentWrapper>
        <S.TabBarWrapper>
          <TabBar />
        </S.TabBarWrapper>
      </S.PageWrapper>
    </>
  );
}
