import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Menu from "../../components/Menu";
import HomeBadge from "../../components/HomeBadge";
import * as S from "./HomePage.style";
import { Star } from "../../icons";
import { getVisibility } from "../../apis/portfolio";
import { getMyPage } from "../../apis/user";
export default function HomePage() {
  const [visibilityMap, setVisibilityMap] = useState<Record<number, boolean>>(
    {},
  );
  const [previewMap, setPreviewMap] = useState<Record<number, any[]>>({});
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const res = await getVisibility();

        const map: Record<number, boolean> = {};
        const preview: Record<number, any[]> = {};

        res.visibility.forEach((v: any) => {
          map[v.typeId] = v.visible;
        });

        Object.entries(res.previews).forEach(([typeId, value]: any) => {
          preview[Number(typeId)] = value.items;
        });

        setVisibilityMap(map);
        setPreviewMap(preview);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisibility();
  }, []);

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const result = await getMyPage();
        setTags(result.tags || []);
      } catch (error) {
        console.error("마이페이지 조회 실패", error);
      }
    };

    fetchMyPage();
  }, []);

  const handleVisibilityChange = (typeId: number, visible: boolean) => {
    setVisibilityMap((prev) => ({
      ...prev,
      [typeId]: visible,
    }));
  };

  return (
    <S.PageWrapper>
      <Header />

      <S.ContentWrapper>
        <S.CenterWrapper>
          <S.HomeMenu>
            <Menu
              previewMap={previewMap}
              basePath="home"
              isOwner={true}
              visibilityMap={visibilityMap}
              onToggleVisibility={handleVisibilityChange}
            />
          </S.HomeMenu>

          <S.AiTagContainer>
            <S.AiTagBox>
              <Star />
              AI 기반 생성 태그
            </S.AiTagBox>
            {tags.length > 0 ? (
              tags.map((tag, index) => <HomeBadge key={index} label={tag} />)
            ) : (
              <span>태그 없음</span>
            )}
          </S.AiTagContainer>
        </S.CenterWrapper>
      </S.ContentWrapper>

      <S.TabBarWrapper>
        <TabBar />
      </S.TabBarWrapper>
    </S.PageWrapper>
  );
}
