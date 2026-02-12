import React from "react";
import * as S from "./RequestItem.style";
import { RequestProfile } from "../../assets";

type RequestItemProps = {
  userId: number;
  nickname: string;
  job: string;
  isMatched: boolean;
  onReject: (userId: number) => void;
  onAccept: (profile: {
    userId: number;
    nickname: string;
    isMatched: boolean;
  }) => void;
};

export default function RequestItem({
  userId,
  nickname,
  job,
  isMatched,
  onReject,
  onAccept,
}: RequestItemProps) {
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
          <S.AllowBox onClick={() => onAccept({ userId, nickname, isMatched })}>
            수락
          </S.AllowBox>
        </S.SelectBox>
      </S.RequestContainer>
    </>
  );
}
