import React, { useState, useEffect } from "react";
import * as S from "./RecommendPage.style";
import RecommendHeader from "../../components/RecommendHeader";
import TabBar from "../../components/TabBar";
import { HeartOn, HeartOff, Search, SlideLeft, SlideRight } from "../../icons";
import { DefaultProfile } from "../../assets";
import Badge from "../../components/Badge";
import { getUserSearch, postUserLike, deleteUserLike } from "../../apis/user";
import { postRequestMate, getProfileImage, getMatching } from "../../apis/mate";

export default function RecommendPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchProfile, setSearchProfile] = useState<any | null>(null);
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [mates, setMates] = useState<any[]>([]);

  useEffect(() => {
    if (searchValue === "") {
      setIsSearching(false);
      setSearchProfile(null);
      setCurrentIndex(0);
    }
  }, [searchValue]);

  const currentProfile = isSearching ? searchProfile : mates[currentIndex];

  useEffect(() => {
    const fetchMatching = async () => {
      try {
        const data = await getMatching();
        const mapped = await Promise.all(
          data.map(async (user: any) => {
            let profileImageUrl = null;

            if (user.profileImage) {
              profileImageUrl = await getProfileImage(user.userId);
            }
            return {
              userId: user.userId,
              nickname: user.nickName,
              job: user.job || "직무 정보 없음",
              introduction: user.introduction || "자기소개 없음",
              tags: user.tags || [],
              profileImageUrl,
              heartCount: user.likeCount || 0,
              liked: user.liked || false,
              similarityPercent: user.similarityPercent || 0,
            };
          }),
        );

        setMates(mapped);
      } catch (e) {
        console.error("추천 메이트 불러오기 실패", e);
      }
    };

    fetchMatching();
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setIsSearching(false);
      setSearchProfile(null);
      setCurrentIndex(0);
    }
  }, [searchValue]);

  useEffect(() => {
    if (currentProfile) {
      setHeartCount(currentProfile.heartCount || 0);
      setIsHearted(currentProfile.liked || false);
    }
  }, [currentProfile]);

  const handleNext = () => {
    setIsSearching(false);
    setCurrentIndex((prev) => (prev === mates.length - 1 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setIsSearching(false);
    setCurrentIndex((prev) => (prev === 0 ? mates.length - 1 : prev - 1));
  };

  const handleSearch = async () => {
    try {
      const res = await getUserSearch(searchValue.trim());
      const user = res.result;
      let profileImageUrl = null;

      if (user.profileImage) {
        profileImageUrl = await getProfileImage(user.userId);
      }
      setSearchProfile({
        userId: user.userId,
        nickname: user.nickName,
        job: user.job || "직무 정보 없음",
        introduction: user.introduction || "자기소개 없음",
        tags: user.tags || [],
        profileImageUrl,
        heartCount: user.likeCount || 0,
        liked: user.liked || false,
      });

      setIsSearching(true);
    } catch (err) {
      alert("해당 닉네임을 찾을 수 없습니다");
      console.error(err);
    }
  };

  const handleMatchRequest = async () => {
    if (!currentProfile) return;
    try {
      await postRequestMate(currentProfile.userId);
      alert("매칭 신청을 보냈습니다.");
    } catch (err) {
      console.error(err);
      alert("이미 신청을 보냈습니다.");
    }
  };

  const handleHeartClick = async () => {
    if (!currentProfile) return;
    try {
      if (isHearted) {
        const res = await deleteUserLike(currentProfile.userId);
        setIsHearted(false);
        setHeartCount(res.likeCount);
      } else {
        const res = await postUserLike(currentProfile.userId);
        setIsHearted(true);
        setHeartCount(res.likeCount);
      }
    } catch (e) {
      console.error("좋아요 실패", e);
    }
  };
  if (!currentProfile) return null;

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
        <S.TopContainer>
          <S.PercentBox>
            {!isSearching && (
              <S.PercentValue>
                AI 기반 유사도: {currentProfile.similarityPercent ?? 0}%
              </S.PercentValue>
            )}
          </S.PercentBox>
          <S.HeartBox onClick={handleHeartClick} style={{ cursor: "pointer" }}>
            {isHearted ? <HeartOn /> : <HeartOff />}
            <S.HeartCounter>{heartCount}</S.HeartCounter>
          </S.HeartBox>
        </S.TopContainer>
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
