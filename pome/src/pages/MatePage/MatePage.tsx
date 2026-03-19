import React, { useState, useEffect } from "react";
import * as S from "./MatePage.style";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Badge from "../../components/Badge";
import { DefaultProfile } from "../../assets";
import { HeartOn, HeartOff, SwitchOn } from "../../icons";
import { getMateProfile } from "../../apis/mate";

export default function MatePage() {
  const [mateInfo, setMateInfo] = useState<any>(null);
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const handleHeartClick = () => {
    if (isHearted) {
      setHeartCount((prev) => prev - 1);
    } else {
      setHeartCount((prev) => prev + 1);
    }
    setIsHearted((prev) => !prev);
  };

  useEffect(() => {
    const fetchMate = async () => {
      try {
        const data = await getMateProfile();
        setMateInfo(data);
        setHeartCount(data.likeCount);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMate();
  }, []);

  if (!mateInfo) return <div>로딩중...</div>;

  return (
    <>
      <Header />

      <S.ProfileContainer>
        <S.ProfileBox>
          {mateInfo.profileImage ? (
            <S.ProfileImage
              src={`http://43.203.188.196${mateInfo.profileImage}`}
            />
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
        </S.InfoContainer>
      </S.DetailContainer>

      <TabBar />
    </>
  );
}