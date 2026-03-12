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
type User = {
  userId: number;
  nickname: string;
  job: string;
  isMatched: boolean;
};
export default function RequestPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [showNotice, setShowNotice] = useState(false);
  const [selectedMateName, setSelectedMateName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await getMateRequests();

      const mapped = res.result.map((u: any) => ({
        userId: u.mateId,
        nickname: u.mateNickname,
        job: "직무 정보 없음",
        isMatched: false,
      }));

      setUsers(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (profile: {
    userId: number;
    nickname: string;
    isMatched: boolean;
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
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
      await fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseNotice = async () => {
    if (selectedUserId !== null) {
      try {
        await patchRejectMate(selectedUserId);

        setUsers((prev) => prev.filter((u) => u.userId !== selectedUserId));
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
              {...user}
              onReject={handleReject}
              onAccept={handleAccept}
            />
          ))}
        </S.ListContainer>
      </S.PageWrapper>
      {showNotice && (
        <NoticePop mateName={selectedMateName} onClose={handleCloseNotice} />
      )}
    </>
  );
}
