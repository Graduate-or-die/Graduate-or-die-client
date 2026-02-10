import React from "react";
import * as S from "./DetailHeader.style";
import { Down, ArrowLeft } from "../../icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { CategoryKey } from "../../constants/categories";

type DetailHeaderProps = {
  category: CategoryKey;
};

export default function DetailHeader({
  category,
}: DetailHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    if (location.state?.from === "mate") {
      navigate("/mate", {
        state: { backTab: "mate" },
        replace: true,
      });
      return;
    }

    if (location.state?.from === "my") {
      navigate("/mate", {
        state: { backTab: "my" },
        replace: true,
      });
      return;
    }

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
        </S.DetailHeaderBox>
      </S.DetailHeader>
    </>
  );
}
