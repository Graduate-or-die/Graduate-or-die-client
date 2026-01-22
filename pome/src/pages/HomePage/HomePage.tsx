import React from "react";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Menu from "../../components/Menu";
import HomeBadge from "../../components/HomeBadge";
import * as S from "./HomePage.style";
import { Star } from "../../icons";
import { DETAIL_DEFAULT_BY_CATEGORY } from "../../constants/defaultDetailItem";

export default function HomePage() {
  return (
    <>
      <S.PageWrapper>
        <Header />

        <S.ContentWrapper>
          <S.CenterWrapper>
            <S.HomeMenu>
              <Menu
                data={DETAIL_DEFAULT_BY_CATEGORY}
                basePath="home"
                isOwner={true}
              />
            </S.HomeMenu>
            <S.AiTagContainer>
              <S.AiTagBox>
                <Star />
                AI 기반 생성 태그
              </S.AiTagBox>
              <HomeBadge label="#대회마스터" />
              <HomeBadge label="#프론트엔드개발자" />
            </S.AiTagContainer>
          </S.CenterWrapper>
        </S.ContentWrapper>
        <S.TabBarWrapper>
          <TabBar />
        </S.TabBarWrapper>
      </S.PageWrapper>
    </>
  );
}
