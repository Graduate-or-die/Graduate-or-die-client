import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./MyDetailPage.style";
import MyDetailForm from "../../components/MyDetailForm";
import DetailHeader from "../../components/DetailHeader";
import TabBar from "../../components/TabBar";
import { CategoryKey } from "../../constants/categories";
import { DetailItem } from "../../types/detail";
import { getPortfolio } from "../../apis/portfolio";

export default function MyDetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const safeCategory = category as CategoryKey;

  const [education, setEducation] = useState<DetailItem | null>(null);
  const [experiences, setExperiences] = useState<DetailItem[]>([]);
  const [items, setItems] = useState<DetailItem[]>([]);

  const portfolioMap: Record<CategoryKey, number> = {
    education: 1,
    experience: 2,
    activity: 3,
    award: 4,
    qualification: 5,
    project: 6,
    etc: 7,
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (safeCategory === "education") {
          const [eduRes, expRes] = await Promise.all([
            getPortfolio(1),
            getPortfolio(2),
          ]);

          setEducation(eduRes?.item?.items?.[0] ?? null);
          setExperiences(expRes?.item?.items ?? []);
          return;
        }

        const data = await getPortfolio(portfolioMap[safeCategory]);
        setItems(data?.item?.items ?? []);
      } catch (err) {
        console.error("조회 실패", err);
      }
    };

    fetchPortfolio();
  }, [safeCategory]);

  return (
    <>
      <DetailHeader category={safeCategory} />

      <S.FormContainer>
        {safeCategory === "education" && education && (
          <>
            <MyDetailForm
              category="education"
              value={education}
              isEditing={false}
            />

            {experiences.map((item) => (
              <MyDetailForm
                key={item.blockId}
                category="experience"
                value={item}
                isEditing={false}
              />
            ))}
          </>
        )}

        {safeCategory !== "education" &&
          items.map((item) => (
            <MyDetailForm
              key={item.blockId}
              category={safeCategory}
              value={item}
              isEditing={false}
            />
          ))}
      </S.FormContainer>

      <TabBar />
    </>
  );
}