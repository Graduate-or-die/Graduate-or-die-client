import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryKey } from "../../constants/categories";
import * as S from "./MateDetailPage.style";
import TabBar from "../../components/TabBar";
import DetailHeader from "../../components/DetailHeader";
import MateDetailForm from "../../components/MateDetailFrom";
import { getMatePortfolio } from "../../apis/mate";

export default function MateDetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const safeCategory = category as CategoryKey;
  const [education, setEducation] = useState<any | null>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [etc, setEtc] = useState<any | null>(null);

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
    if (!safeCategory) return;

    const fetchData = async () => {
      try {
        if (safeCategory === "education") {
          const [eduRes, expRes] = await Promise.all([
            getMatePortfolio(1),
            getMatePortfolio(2),
          ]);

          const eduItems = eduRes?.item?.items ?? [];
          const expItems = expRes?.item?.items ?? [];

          setEducation(eduItems[0] ?? null);
          setExperiences(expItems);
          return;
        }

        const res = await getMatePortfolio(portfolioMap[safeCategory]);
        const rawItems = res?.item?.items ?? [];

        if (safeCategory === "etc") {
          setEtc(rawItems[0] ?? null);
        } else {
          setItems(rawItems);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [safeCategory]);
  if (!safeCategory) return null;
  return (
    <>
      <DetailHeader category={safeCategory} />
      <S.ContentWrapper>
        <S.FormContainer>
          {safeCategory === "education" && (
            <>
              {education && (
                <MateDetailForm
                  category="education"
                  value={education}
                  isEditing={false}
                />
              )}

              {experiences.map((item, index) => (
                <MateDetailForm
                  key={item.blockId ?? `exp-${index}`}
                  category="experience"
                  value={item}
                  isEditing={false}
                />
              ))}
            </>
          )}
          {safeCategory === "etc" && etc && (
            <MateDetailForm category="etc" value={etc} isEditing={false} />
          )}
          {safeCategory !== "education" &&
            safeCategory !== "etc" &&
            items.map((item, index) => (
              <MateDetailForm
                key={item.blockId ?? `item-${index}`}
                category={safeCategory}
                value={item}
                isEditing={false}
              />
            ))}
        </S.FormContainer>
      </S.ContentWrapper>
      <TabBar />
    </>
  );
}
