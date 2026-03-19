import React, { useState, useEffect } from "react";
import * as S from "./MateHomePage.style";
import MateHeader from "../../components/MateHeader";
import TabBar from "../../components/TabBar";
import Menu from "../../components/Menu";
import { useLocation } from "react-router-dom";
import { getMateVisibility } from "../../apis/mate";
import { getVisibility } from "../../apis/portfolio";

type TabType = "mate" | "my";

export default function MateHomePage() {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return location.state?.backTab ?? "mate";
  });

  const [visibilityMap, setVisibilityMap] = useState<Record<number, boolean>>({});
  const [previewMap, setPreviewMap] = useState<Record<number, any[]>>({});

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const res =
          activeTab === "mate"
            ? await getMateVisibility()
            : await getVisibility();

        const map: Record<number, boolean> = {};
        const preview: Record<number, any[]> = {};

        res.visibility.forEach((v: any) => {
          map[v.typeId] = v.visible;
        });

        Object.entries(res.previews).forEach(
          ([typeId, value]: any) => {
            preview[Number(typeId)] = value.items;
          }
        );

        setVisibilityMap(map);
        setPreviewMap(preview);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisibility();
  }, [activeTab]);

  const handleVisibilityChange = (typeId: number, visible: boolean) => {
    setVisibilityMap((prev) => ({
      ...prev,
      [typeId]: visible,
    }));
  };

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
                  onClick={() => {
                    setActiveTab("mate");
                    window.history.replaceState({}, "");
                  }}
                >
                  <S.BadgeText $active={activeTab === "mate"}>
                    메이트
                  </S.BadgeText>
                </S.TabBadge>

                <S.TabBadge
                  $active={activeTab === "my"}
                  onClick={() => {
                    setActiveTab("my");
                    window.history.replaceState({}, "");
                  }}
                >
                  <S.BadgeText $active={activeTab === "my"}>
                    사용자
                  </S.BadgeText>
                </S.TabBadge>
              </S.BadgeContainer>
              <S.HomeMenu>
                <Menu
                  previewMap={previewMap}
                  basePath={activeTab === "mate" ? "mate" : "my"}
                  isOwner={activeTab === "my"}
                  visibilityMap={visibilityMap}
                  onToggleVisibility={handleVisibilityChange}
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