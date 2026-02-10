import React, { useRef, useState, useEffect } from "react";
import * as S from "./MyPage.style";
import Header from "../../components/Header";
import TabBar from "../../components/TabBar";
import Badge from "../../components/Badge";
import { DefaultProfile } from "../../assets";
import { EditPencil, HeartOn, SwitchOff, SwitchOn } from "../../icons";
interface MyInfo {
  userName: string;
  nickName: string;
  introduction: string;
  job: string;
  matching: boolean;
}
export default function MyPage() {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [myInfo, setMyInfo] = useState({
    userName: "윤현서",
    nickName: "김혜림",
    introduction: "저와 개발자 포트폴리오 쌓으실 분 구해요!",
    job: "프론트엔드 개발자",
    matching: false,
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const introRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleSwitch = () => {
    if (!isEditing) return;
    setIsSwitchOn((prev) => {
      const next = !prev;

      setMyInfo((info) => ({
        ...info,
        matching: next,
      }));

      return next;
    });
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;

    setMyInfo((prev) => ({
      ...prev,
      introduction: el.value,
    }));
  };
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [myInfo.introduction]);

  const handleProfileClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <S.ProfileContainer>
        <S.ProfileBox onClick={handleProfileClick}>
          {profileImage ? (
            <S.ProfileImage src={profileImage} />
          ) : (
            <DefaultProfile width={154} height={154} />
          )}
        </S.ProfileBox>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
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
            <div>
              <HeartOn width={32} height={32} />
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
              <Badge label="개발자" />
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
              <S.EditableTextarea
                ref={introRef}
                rows={1}
                value={myInfo.introduction}
                isEditing={isEditing}
                onChange={handleIntroChange}
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
