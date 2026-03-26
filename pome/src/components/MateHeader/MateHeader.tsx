import React, { useState, useEffect } from "react";
import * as S from "./MateHeader.style";
import { PomeLogo } from "../../icons";
import { useNavigate } from "react-router-dom";
import { DefaultProfile } from "../../assets";
import { getMateProfile, getProfileImage } from "../../apis/mate";

export default function MateHeader() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMate = async () => {
      try {
        const data = await getMateProfile();
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
  return (
    <>
      <S.Header>
        <S.HeaderBox>
          <S.ProfileBox onClick={() => navigate("/matepage")}>
            {profileImage ? (
              <img src={profileImage} alt="profile" />
            ) : (
              <DefaultProfile />
            )}
          </S.ProfileBox>
          <PomeLogo />
          <S.AlarmBox></S.AlarmBox>
        </S.HeaderBox>
      </S.Header>
    </>
  );
}
