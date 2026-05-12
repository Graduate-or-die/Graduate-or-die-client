import React from "react";
import * as S from "./RequestItem.style";
import { RequestProfile } from "../../assets";

type RequestItemProps = {
  userId: number;
  nickname: string;
  profileImage: string | null;
  introduction: string;
  onReject: (userId: number) => void;
  onAccept: (profile: {
    userId: number;
    nickname: string;
  }) => void;
};

export default function RequestItem({
  userId,
  nickname,
  profileImage,
  introduction,
  onReject,
  onAccept,
}: RequestItemProps) {
  return (
    <S.RequestContainer>
      <S.ProfileBox>
        {profileImage ? (
          <img src={profileImage} alt="profile" />
        ) : (
          <RequestProfile />
        )}
      </S.ProfileBox>

      <S.ItemBox>
        <S.NameBox>{nickname}</S.NameBox>
        <S.SummaryBox>{introduction}</S.SummaryBox>
      </S.ItemBox>

      <S.SelectBox>
        <S.RejectBox onClick={() => onReject(userId)}>
          거절
        </S.RejectBox>

        <S.AllowBox
          onClick={() =>
            onAccept({
              userId,
              nickname,
            })
          }
        >
          수락
        </S.AllowBox>
      </S.SelectBox>
    </S.RequestContainer>
  );
}