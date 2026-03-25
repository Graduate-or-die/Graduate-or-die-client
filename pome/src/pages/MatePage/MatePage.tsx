import React, { useState, useEffect } from "react";
import * as S from "./MatePage.style";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Badge from "../../components/Badge";
import { DefaultProfile } from "../../assets";
import { HeartOn, HeartOff, SwitchOn } from "../../icons";
import { getMateProfile, deleteMate, getProfileImage } from "../../apis/mate";
import { postUserLike, deleteUserLike } from "../../apis/user";

export default function MatePage() {
  const [mateInfo, setMateInfo] = useState<any>(null);
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleHeartClick = async () => {
    try {
      if (isHearted) {
        const res = await deleteUserLike(mateInfo.userId);
        setIsHearted(false);
        setHeartCount(res.likeCount);
      } else {
        const res = await postUserLike(mateInfo.userId);
        setIsHearted(true);
        setHeartCount(res.likeCount);
      }
    } catch (e) {
      console.error("좋아요 처리 실패", e);
    }
  };

  useEffect(() => {
    const fetchMate = async () => {
      try {
        const data = await getMateProfile();

        setMateInfo(data);
        setHeartCount(data.likeCount);
        setIsHearted(data.liked);

        if (data.profileImage !== null) {
          const image = await getProfileImage(data.userId);
          setProfileImage(image);
        } else {
          setProfileImage(null);
        }
      } catch (e) {
        console.error("메이트 조회 실패", e);
      }
    };

    fetchMate();
  }, []);

  if (!mateInfo) return <div>로딩중...</div>;

  const handleDeleteMate = async () => {
    if (!window.confirm("정말 메이트를 해제하시겠습니까?")) return;

    try {
      await deleteMate();
      alert("메이트가 해제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("메이트 해제에 실패했습니다.");
    }
  };

  return (
    <>
      <Header />

      <S.ProfileContainer>
        <S.ProfileBox>
          {profileImage ? (
            <S.ProfileImage src={profileImage} />
          ) : (
            <DefaultProfile width={154} height={154} />
          )}
        </S.ProfileBox>

        <S.ProfileFont>{mateInfo.userName}</S.ProfileFont>
      </S.ProfileContainer>

      <S.DetailContainer>
        <S.TopBox>
          <S.HeartBox onClick={handleHeartClick} style={{ cursor: "pointer" }}>
            {isHearted ? (
              <HeartOn width={32} height={32} />
            ) : (
              <HeartOff width={32} height={32} />
            )}
            <S.HeartCount>{heartCount}</S.HeartCount>
          </S.HeartBox>
        </S.TopBox>

        <S.InfoContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>닉네임</S.InfoBox1>
            <S.InfoBox2>{mateInfo.nickName}</S.InfoBox2>
          </S.InfoDetailContainer>

          <S.InfoDetailContainer>
            <S.InfoBox1>태그</S.InfoBox1>
            <S.InfoBox2>
              {mateInfo.tags?.map((tag: string) => (
                <Badge key={tag} label={tag} />
              ))}
            </S.InfoBox2>
          </S.InfoDetailContainer>

          <S.InfoDetailContainer>
            <S.InfoBox1>매칭 상태</S.InfoBox1>
            <S.InfoBox2>
              <SwitchOn width={70} height={40} />
            </S.InfoBox2>
          </S.InfoDetailContainer>

          <S.InfoDetailContainer>
            <S.InfoBox1>자기소개</S.InfoBox1>
            <S.InfoBox2>{mateInfo.introduction}</S.InfoBox2>
          </S.InfoDetailContainer>

          <S.InfoDetailContainer>
            <S.InfoBox1>희망 직무</S.InfoBox1>
            <S.InfoBox2>{mateInfo.job}</S.InfoBox2>
          </S.InfoDetailContainer>

          <S.InfoDetailContainer>
            <S.DeleteBox onClick={handleDeleteMate}>메이트 해제</S.DeleteBox>
          </S.InfoDetailContainer>
        </S.InfoContainer>
      </S.DetailContainer>

      <TabBar />
    </>
  );
}
