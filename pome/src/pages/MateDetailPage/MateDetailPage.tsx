import React, { useState } from "react";
import DetailForm from "../../components/DetailForm";
import { DETAIL_DEFAULT_MATE_CATEGORY } from "../../constants/defaultDetailItem";
import { useParams } from "react-router-dom";
import { CategoryKey } from "../../constants/categories";
import { DetailItem } from "../../types/detail";
import * as S from "./MateDetailPage.style";
import TabBar from "../../components/TabBar";
import DetailHeader from "../../components/DetailHeader";

export default function MateDetailPage() {
  const [detailData, setDetailData] = useState(DETAIL_DEFAULT_MATE_CATEGORY);
  const { category } = useParams<{ category: CategoryKey }>();
  const safeCategory = category as CategoryKey;
  if (!safeCategory) return null;

  const items = DETAIL_DEFAULT_MATE_CATEGORY[safeCategory];
  return (
    <>
      <DetailHeader category={safeCategory} showDown={false} />
      <S.ContentWrapper>
        <S.FormContainer>
          {safeCategory === "education" || safeCategory === "experience" ? (
            <>
              {DETAIL_DEFAULT_MATE_CATEGORY.education.map((item) => (
                <DetailForm
                  key={item.id}
                  category="education"
                  value={item}
                  isEditing={false}
                />
              ))}

              {DETAIL_DEFAULT_MATE_CATEGORY.experience.map((item) => (
                <DetailForm
                  key={item.id}
                  category="experience"
                  value={item}
                  isEditing={false}
                />
              ))}
            </>
          ) : (
            DETAIL_DEFAULT_MATE_CATEGORY[safeCategory]?.map((item) => (
              <DetailForm
                key={item.id}
                category={safeCategory}
                value={item}
                isEditing={false}
              />
            ))
          )}
        </S.FormContainer>
      </S.ContentWrapper>
      <TabBar />
    </>
  );
}
