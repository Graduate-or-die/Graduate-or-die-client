import React, {useState} from 'react';
import * as S from './MyPage.style';
import {TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import TabBar from '../../components/TabBar';
import Badge from '../../components/Badge';
import {DefaultProfile} from '../../assets';
import {EditPencil, HeartOff, HeartOn, SwitchOff, SwitchOn} from '../../icons';
export default function MyPage() {
  const [isOn, setIsOn] = useState(true);
  const toggleSwitch = () => {
    setIsOn(prev => !prev);
  };

  return (
    <>
      <Header />
      <S.ProfileContainer />
      <S.DetailContainer>
        <S.TopBox>
          <S.HeartBox />
          <EditPencil />
        </S.TopBox>
        <S.InfoContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>닉네임</S.InfoBox1>
            <S.InfoBox2>김혜림</S.InfoBox2>
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
              <TouchableOpacity onPress={toggleSwitch}>
                {isOn ? <SwitchOn /> : <SwitchOff />}
              </TouchableOpacity>
            </S.InfoBox2>
          </S.InfoDetailContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>자기소개</S.InfoBox1>
            <S.InfoBox2>저와 개발자 포트폴리오 쌓으실 분 구해요!</S.InfoBox2>
          </S.InfoDetailContainer>
          <S.InfoDetailContainer>
            <S.InfoBox1>희망 직무</S.InfoBox1>
            <S.InfoBox2>프론트엔드 개발자</S.InfoBox2>
          </S.InfoDetailContainer>
        </S.InfoContainer>
      </S.DetailContainer>
      <TabBar />
    </>
  );
}
