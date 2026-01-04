import React from "react";
import * as S from "./DetailHeader.style";
import { Down, ArrowLeft } from "../../icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { CategoryKey } from "../../constants/categories";

type DetailHeaderProps = {
  category: CategoryKey;
};

export default function DetailHeader({ category }: DetailHeaderProps) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const title =
    category === "education" || category === "experience"
      ? "학력/경력"
      : CATEGORIES[category as keyof typeof CATEGORIES];
  return (
    <>
      <S.DetailHeader>
        <S.DetailHeaderBox>
          <S.LeftBox>
            <button onClick={goBack}>
              <ArrowLeft />
            </button>
            {title}
          </S.LeftBox>
          <Down />
        </S.DetailHeaderBox>
      </S.DetailHeader>
    </>
  );
}
