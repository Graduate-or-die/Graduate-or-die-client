import React, { useState } from "react";
import * as S from "./MateHomePage.style";
import MateHeader from "../../components/MateHeader";
import TabBar from "../../components/TabBar";
import Menu from "../../components/Menu";
import {
  DETAIL_DEFAULT_MATE_CATEGORY,
  DETAIL_DEFAULT_BY_CATEGORY,
} from "../../constants/defaultDetailItem";
type TabType = "mate" | "my";
export default function MateHomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("mate");
  const menuData =
    activeTab === "mate"
      ? DETAIL_DEFAULT_MATE_CATEGORY
      : DETAIL_DEFAULT_BY_CATEGORY;
  return (
    <>
      <S.PageWrapper>
        <MateHeader />
        <S.ContentWrapper>
          <S.CenterWrapper>
            <S.MateHomeWrapper>
              <S.BadgeContainer>
                <S.TabBadge
                  $active={activeTab === "mate"}
                  onClick={() => setActiveTab("mate")}
                >
                  <S.BadgeText $active={activeTab === "mate"}>
                    메이트
                  </S.BadgeText>
                </S.TabBadge>
                <S.TabBadge
                  $active={activeTab === "my"}
                  onClick={() => setActiveTab("my")}
                >
                  <S.BadgeText $active={activeTab === "my"}>
                    사용자
                  </S.BadgeText>
                </S.TabBadge>
              </S.BadgeContainer>
              <S.HomeMenu>
                <Menu
                  data={menuData}
                  basePath={activeTab === "mate" ? "mate" : "my"}
                  isOwner={activeTab === "my"}
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
