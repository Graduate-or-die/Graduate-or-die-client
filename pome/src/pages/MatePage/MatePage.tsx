import React, { useState } from "react";
import * as S from "./MatePage.style";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Badge from "../../components/Badge";
import { DefaultProfile } from "../../assets";
import { HeartOn, HeartOff, SwitchOn } from "../../icons";
import { deleteMate } from "../../apis/mate";
export default function MatePage() {
  const mateInfo = {
    userName: "구준회",
    nickName: "이해림",
    introduction: "저 수상경력 미칩니다",
    job: "프론트엔드 개발자",
    heartCount: 37,
    tags: ["프론트엔드개발자", "대기업러버"],
    profileImage: "/dummy-profile.png",
  };
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(37);
  const handleHeartClick = () => {
    if (isHearted) {
      setHeartCount((prev) => prev - 1);
    } else {
      setHeartCount((prev) => prev + 1);
    }
    setIsHearted((prev) => !prev);
  };

  const handleDeleteMate = async () => {
    const confirm = window.confirm("정말 메이트를 해제하시겠습니까?");
    if (!confirm) return;

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
          {mateInfo.profileImage ? (
            <S.ProfileImage src={mateInfo.profileImage} />
          ) : (
            <DefaultProfile width={154} height={154} />
          )}
        </S.ProfileBox>

        <S.ProfileFont>{mateInfo.userName}</S.ProfileFont>
      </S.ProfileContainer>

      <S.DetailContainer>
        <S.TopBox>
          <S.HeartBox onClick={handleHeartClick} style={{ cursor: "pointer" }}>
            <div>
              {isHearted ? (
                <HeartOn width={32} height={32} />
              ) : (
                <HeartOff width={32} height={32} />
              )}
            </div>
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
              {mateInfo.tags.map((tag) => (
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
