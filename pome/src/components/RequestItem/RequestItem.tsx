import React from "react";
import * as S from "./RequestItem.style";
import { RequestProfile } from "../../assets";
import { useNavigate } from "react-router-dom";

type RequestItemProps = {
  userId: number;
  nickname: string;
  job: string;
  onReject: (userId: number) => void;
};

export default function RequestItem({
  userId,
  nickname,
  job,
  onReject,
}: RequestItemProps) {
  const navigate = useNavigate();
  return (
    <>
      <S.RequestContainer>
        <S.ProfileBox>
          <RequestProfile />
        </S.ProfileBox>
        <S.ItemBox>
          <S.NameBox>{nickname}</S.NameBox>
          <S.SummaryBox>{job}</S.SummaryBox>
        </S.ItemBox>
        <S.SelectBox>
          <S.RejectBox onClick={() => onReject(userId)}>거절</S.RejectBox>
          <S.AllowBox onClick={() => navigate("/match")}>수락</S.AllowBox>
        </S.SelectBox>
      </S.RequestContainer>
    </>
  );
}
