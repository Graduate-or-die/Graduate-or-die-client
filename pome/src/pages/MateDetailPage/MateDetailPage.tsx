import React, { useState } from "react";
import { DETAIL_DEFAULT_MATE_CATEGORY } from "../../constants/defaultDetailItem";
import { useParams } from "react-router-dom";
import { CategoryKey } from "../../constants/categories";
import * as S from "./MateDetailPage.style";
import TabBar from "../../components/TabBar";
import DetailHeader from "../../components/DetailHeader";
import MateDetailForm from "../../components/MateDetailFrom";
export default function MateDetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const safeCategory = category as CategoryKey;
  if (!safeCategory) return null;

  return (
    <>
      <DetailHeader category={safeCategory} />
      <S.ContentWrapper>
        <S.FormContainer>
          {safeCategory === "education" || safeCategory === "experience" ? (
            <>
              {DETAIL_DEFAULT_MATE_CATEGORY.education.map((item) => (
                <MateDetailForm
                  key={item.id}
                  category="education"
                  value={item}
                  isEditing={false}
                />
              ))}

              {DETAIL_DEFAULT_MATE_CATEGORY.experience.map((item) => (
                <MateDetailForm
                  key={item.id}
                  category="experience"
                  value={item}
                  isEditing={false}
                />
              ))}
            </>
          ) : (
            DETAIL_DEFAULT_MATE_CATEGORY[safeCategory]?.map((item) => (
              <MateDetailForm
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
