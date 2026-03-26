import React, { useState, useEffect } from "react";
import * as S from "./RequestPage.style";
import Header from "../../components/Header";
import RequestItem from "../../components/RequestItem";
import { useNavigate } from "react-router-dom";
import NoticePop from "../../components/NoticePop";

import {
  getMateRequests,
  postAcceptMate,
  patchRejectMate,
} from "../../apis/mate";

import { getProfileImage } from "../../apis/mate";

type MateRequest = {
  userId: number;
  nickname: string;
  introduction: string;
  profileImageUrl: string | null;
};

export default function RequestPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<MateRequest[]>([]);
  const [showNotice, setShowNotice] = useState(false);
  const [selectedMateName, setSelectedMateName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchProfileImages = async (list: MateRequest[]) => {
    const updated = await Promise.all(
      list.map(async (u) => {
        let profileImageUrl = null;

        try {
          profileImageUrl = await getProfileImage(u.userId);
        } catch (e) {
          profileImageUrl = null;
        }

        return {
          ...u,
          profileImageUrl,
        };
      })
    );

    setUsers(updated);
  };

  const fetchRequests = async () => {
    try {
      const res = await getMateRequests();

      const mapped: MateRequest[] = res.result.map((u: any) => ({
        userId: u.mateId,
        nickname: u.mateNickname,
        introduction: u.mateIntroduction,
        profileImageUrl: null,
      }));

      await fetchProfileImages(mapped);
    } catch (err) {
      console.error("메이트 요청 조회 실패", err);
    }
  };

  const handleAccept = async (profile: {
    userId: number;
    nickname: string;
  }) => {
    try {
      await postAcceptMate(profile.userId);
      navigate("/match");
    } catch (err) {
      console.error(err);
      setSelectedMateName(profile.nickname);
      setSelectedUserId(profile.userId);
      setShowNotice(true);
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await patchRejectMate(userId);

      setUsers((prev) =>
        prev.filter((user) => user.userId !== userId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseNotice = async () => {
    if (selectedUserId !== null) {
      try {
        await patchRejectMate(selectedUserId);

        setUsers((prev) =>
          prev.filter((u) => u.userId !== selectedUserId)
        );
      } catch (err) {
        console.error(err);
      }
    }

    setShowNotice(false);
    setSelectedMateName("");
    setSelectedUserId(null);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Header />

      <S.PageWrapper>
        <S.ListContainer>
          {users.map((user) => (
            <RequestItem
              key={user.userId}
              userId={user.userId}
              nickname={user.nickname}
              profileImage={user.profileImageUrl}
              introduction={user.introduction}
              onReject={handleReject}
              onAccept={handleAccept}
            />
          ))}
        </S.ListContainer>
      </S.PageWrapper>

      {showNotice && (
        <NoticePop
          mateName={selectedMateName}
          onClose={handleCloseNotice}
        />
      )}
    </>
  );
}