import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./DetailPage.style";
import { Trash, Plus } from "../../icons";
import DetailForm from "../../components/DetailForm";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import { TabBar } from "../../components/TabBar/TabBar.style";

export default function DetailPage() {
  const { category } = useParams<{ category: CategoryKey }>();
  const navigate = useNavigate();
  if (!category) return null;
  return (
    <>
      <DetailHeader category={category} />
      <S.DoneTrashContainer>
        <S.DoneBox onClick={() => navigate("/home")}>완료</S.DoneBox>
        <Trash />
      </S.DoneTrashContainer>
      <S.FormContainer>
        <DetailForm category={category} />
      </S.FormContainer>
      <S.PlusBox>
        <Plus style={{ color: "#0086AB" }} />
      </S.PlusBox>
      <TabBar />
    </>
  );
}
