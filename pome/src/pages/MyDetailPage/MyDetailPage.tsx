import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./MyDetailPage.style";
import MyDetailForm from "../../components/MyDetailForm";
import DetailHeader from "../../components/DetailHeader";
import TabBar from "../../components/TabBar";
import { CategoryKey } from "../../constants/categories";
import { DETAIL_DEFAULT_BY_CATEGORY } from "../../constants/defaultDetailItem";
import { DetailItem } from "../../types/detail";

export default function MyDetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();

  const safeCategory = category as CategoryKey;

  const [education, setEducation] = useState<DetailItem | null>(null);
  const [experiences, setExperiences] = useState<DetailItem[]>([]);
  const [items, setItems] = useState<DetailItem[]>([]);

  useEffect(() => {
    switch (safeCategory) {
      case "education":
        setEducation({
          ...DETAIL_DEFAULT_BY_CATEGORY.education[0],
          id: 1,
        });
        setExperiences(
          DETAIL_DEFAULT_BY_CATEGORY.experience.map((e, idx) => ({
            ...e,
            id: idx + 1,
          })),
        );
        break;

      default:
        const data = DETAIL_DEFAULT_BY_CATEGORY[safeCategory];
        if (Array.isArray(data)) {
          setItems(data.map((e, idx) => ({ ...e, id: idx + 1 })));
        }
        break;
    }
  }, [safeCategory]);

  /* const goToComment = (field: string, id?: string) => {
    if (id) {
      navigate(`/my/detail/${safeCategory}/${id}/${field}`);
    } else {
      navigate(`/my/detail/${safeCategory}/${field}`);
    }
  }; */
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
                key={item.id}
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
              key={item.id}
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
