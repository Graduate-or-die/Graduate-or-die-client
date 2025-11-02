import React, { useRef, useState, useEffect } from "react";
import * as S from "./MyPage.style";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Badge from "../../components/Badge";
import { DefaultProfile } from "../../assets";
import {
  EditPencil,
  HeartOff,
  HeartOn,
  SwitchOff,
  SwitchOn,
} from "../../icons";
export default function MyPage() {
  const [isHeartOn, setIsHeartOn] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleHeart = () => setIsHeartOn((prev) => !prev);
  const toggleSwitch = () => {
    setIsSwitchOn((prev) => !prev);
    setMyInfo((prev) => ({
      ...prev,
      matching: !isSwitchOn,
    }));
  };
  interface MyInfo {
    userName: string;
    nickName: string;
    introduction: string;
    job: string;
    matching: boolean;
  }
  const [myInfo, setMyInfo] = useState({
    userName: "윤현서",
    nickName: "김혜림",
    introduction: "저와 개발자 포트폴리오 쌓으실 분 구해요!",
    job: "프론트엔드 개발자",
    matching: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const handleNickNameChange = (value: string) => {
    setMyInfo((prev) => ({ ...prev, nickName: value }));
  };

  const handleIntroductionChange = (value: string) => {
    setMyInfo((prev) => ({ ...prev, introduction: value }));
  };

  const handleJobChange = (value: string) => {
    setMyInfo((prev) => ({ ...prev, job: value }));
  };

  const handleUserNameChange = (value: string) => {
    setMyInfo((prev) => ({ ...prev, userName: value }));
  };

  return (
    <>
      <Header />
      <S.ProfileContainer>
        <S.ProfileBox>
          <DefaultProfile />
        </S.ProfileBox>
        <S.ProfileFont>
          <S.NameEditable
            value={myInfo.userName}
            isEditing={isEditing}
            onChange={(e) =>
              setMyInfo((prev) => ({ ...prev, userName: e.target.value }))
            }
          />
        </S.ProfileFont>
      </S.ProfileContainer>
      <S.DetailContainer>
        <S.TopBox>
          <S.HeartBox>
            <div onClick={toggleHeart} style={{ cursor: "pointer" }}>
              {isHeartOn ? (
                <HeartOn width={32} height={32} />
              ) : (
                <HeartOff width={32} height={32} />
              )}
            </div>
            <S.HeartCount>30</S.HeartCount>
          </S.HeartBox>
          <S.EditBox
            onClick={() => setIsEditing((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            <EditPencil width={32} height={32} />
          </S.EditBox>
        </S.TopBox>
        <S.InfoContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>닉네임</S.InfoBox1>
            <S.InfoBox2>
              <S.EditableInput
                value={myInfo.nickName}
                isEditing={isEditing}
                onChange={(e) =>
                  setMyInfo((prev) => ({ ...prev, nickName: e.target.value }))
                }
              />
            </S.InfoBox2>
          </S.InfoDetailContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>태그</S.InfoBox1>
            <S.InfoBox2>
              <Badge label="대학재학생" />
              <Badge label="IT" />
              <Badge label="개발자" />
            </S.InfoBox2>
          </S.InfoDetailContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>매칭 활성화</S.InfoBox1>
            <S.InfoBox2>
              <div onClick={toggleSwitch} style={{ cursor: "pointer" }}>
                {isSwitchOn ? (
                  <SwitchOn width={70} height={40} />
                ) : (
                  <SwitchOff width={70} height={40} />
                )}
              </div>
            </S.InfoBox2>
          </S.InfoDetailContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>자기소개</S.InfoBox1>
            <S.InfoBox2>
              <S.EditableInput
                value={myInfo.introduction}
                isEditing={isEditing}
                onChange={(e) =>
                  setMyInfo((prev) => ({
                    ...prev,
                    introduction: e.target.value,
                  }))
                }
              />
            </S.InfoBox2>
          </S.InfoDetailContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>희망 직무</S.InfoBox1>
            <S.InfoBox2>
              <S.EditableInput
                value={myInfo.job}
                isEditing={isEditing}
                onChange={(e) =>
                  setMyInfo((prev) => ({ ...prev, job: e.target.value }))
                }
              />
            </S.InfoBox2>
          </S.InfoDetailContainer>
        </S.InfoContainer>
      </S.DetailContainer>
      <TabBar />
    </>
  );
}
