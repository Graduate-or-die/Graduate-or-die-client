import React from "react";
import * as S from "./MateHomePage.style";
import MateHeader from "../../components/MateHeader";
import TabBar from "../../components/TabBar";
import Menu from "../../components/Menu";
import { DETAIL_DEFAULT_MATE_CATEGORY } from "../../constants/defaultDetailItem";
export default function MateHomePage() {
  return (
    <>
      <S.PageWrapper>
        <MateHeader />
        <S.ContentWrapper>
          <S.CenterWrapper>
            <S.MateHomeWrapper>
              <S.BadgeContainer>
                <S.TabBadge>
                  <S.BadgeText>메이트</S.BadgeText>
                </S.TabBadge>
                <S.TabBadge>
                  <S.BadgeText>사용자</S.BadgeText>
                </S.TabBadge>
              </S.BadgeContainer>
              <S.HomeMenu>
                <Menu
                  data={DETAIL_DEFAULT_MATE_CATEGORY}
                  basePath="mate"
                  isOwner={false}
                />
              </S.HomeMenu>
            </S.MateHomeWrapper>
          </S.CenterWrapper>
        </S.ContentWrapper>
      </S.PageWrapper>
      <TabBar />
    </>
  );
}
