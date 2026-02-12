import React, { useState } from "react";
import * as S from "./MateHeader.style";
import { PomeLogo, Alarm } from "../../icons";
import { useNavigate } from "react-router-dom";
import { DefaultProfile } from "../../assets";
import { RECOMMEND_DEFAULT_LIST } from "../../constants/RecommendProfile";
export default function MateHeader() {
  const [mateIndex] = useState(1);
  const mateProfile = RECOMMEND_DEFAULT_LIST[mateIndex];
  const navigate = useNavigate();
  return (
    <>
      <S.Header>
        <S.HeaderBox>
          <S.ProfileBox onClick={() => navigate("/matepage")}>
            {mateProfile.profileImageUrl ? (
              <img src={mateProfile.profileImageUrl} alt="profile" />
            ) : (
              <DefaultProfile />
            )}
          </S.ProfileBox>
          <PomeLogo />
          <S.AlarmBox>
            <Alarm />
          </S.AlarmBox>
        </S.HeaderBox>
      </S.Header>
    </>
  );
}
