import React, { useState, useEffect } from "react";
import * as S from "./RecommendPage.style";
import RecommendHeader from "../../components/RecommendHeader";
import TabBar from "../../components/TabBar";
import { RECOMMEND_DEFAULT_LIST } from "../../constants/RecommendProfile";
import { HeartOn, Search, SlideLeft, SlideRight } from "../../icons";
import { DefaultProfile } from "../../assets";
import Badge from "../../components/Badge";
import { getUserSearch } from "../../apis/user";
import { postRequestMate } from "../../apis/mate";
export default function RecommendPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchProfile, setSearchProfile] = useState<any | null>(null);

  useEffect(() => {
    if (searchValue === "") {
      setIsSearching(false);
      setSearchProfile(null);
      setCurrentIndex(0);
    }
  }, [searchValue]);

  const currentProfile = isSearching
    ? searchProfile
    : RECOMMEND_DEFAULT_LIST[currentIndex];

  const handleNext = () => {
    setIsSearching(false);
    setCurrentIndex((prev) =>
      prev === RECOMMEND_DEFAULT_LIST.length - 1 ? 0 : prev + 1,
    );
  };
  const handlePrev = () => {
    setIsSearching(false);
    setCurrentIndex((prev) =>
      prev === 0 ? RECOMMEND_DEFAULT_LIST.length - 1 : prev - 1,
    );
  };
  const handleSearch = async () => {
    try {
      const res = await getUserSearch(searchValue.trim());
      console.log("검색 결과:", res);
      const user = res.result;

      setSearchProfile({
        userId: user.userId,
        nickname: user.nickName,
        job: user.job || "직무 정보 없음",
        introduction: user.introduction || "자기소개 없음",
        tags: user.tags || [],
        profileImageUrl: user.profileImage,
        heartCount: user.likeCount || 0,
      });

      setIsSearching(true);
    } catch (err) {
      alert("해당 닉네임을 찾을 수 없습니다");
      console.error(err);
    }
  };
  const handleMatchRequest = async () => {
    try {
      await postRequestMate(currentProfile.userId);
      alert("매칭 신청을 보냈습니다.");
    } catch (err) {
      console.error(err);
      alert("이미 신청을 보냈습니다.");
    }
  };

  return (
    <>
      <RecommendHeader />
      <S.SearchContainer>
        <S.SearchBox
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Search onClick={handleSearch} />
      </S.SearchContainer>
      <S.RecommendContainer>
        <S.HeartBox>
          <HeartOn />
          <S.HeartCounter>{currentProfile.heartCount}</S.HeartCounter>
        </S.HeartBox>
        <S.ProfileImageBox>
          {currentProfile.profileImageUrl ? (
            <img src={currentProfile.profileImageUrl} alt="profile" />
          ) : (
            <DefaultProfile />
          )}
        </S.ProfileImageBox>
        <S.NickNameBox>{currentProfile.nickname}</S.NickNameBox>
        <S.SlideBox isHidden={isSearching}>
          <S.SlideIcon>
            <SlideLeft onClick={handlePrev} />
          </S.SlideIcon>
          <S.SlideIcon>
            <SlideRight onClick={handleNext} />
          </S.SlideIcon>
        </S.SlideBox>
        <S.InfoContainer>
          <S.InfoBox>
            <S.KeyBox>태그</S.KeyBox>
            <S.ValueBox>
              {currentProfile?.tags?.map((tag: string) => (
                <Badge key={tag} label={tag} height={26} fontSize={15} />
              ))}
            </S.ValueBox>
          </S.InfoBox>
          <S.InfoBox>
            <S.KeyBox>자기소개</S.KeyBox>
            <S.ValueBox>{currentProfile.introduction}</S.ValueBox>
          </S.InfoBox>
          <S.InfoBox>
            <S.KeyBox>희망 직무</S.KeyBox>
            <S.ValueBox>{currentProfile.job}</S.ValueBox>
          </S.InfoBox>
        </S.InfoContainer>
        <S.MatchingButton onClick={handleMatchRequest}>
          매칭 신청
        </S.MatchingButton>
      </S.RecommendContainer>
      <TabBar />
    </>
  );
}
