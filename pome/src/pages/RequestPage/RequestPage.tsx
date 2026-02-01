import React, { useState } from "react";
import * as S from "./RequestPage.style";
import Header from "../../components/Header";
import RequestItem from "../../components/RequestItem";
import { RECOMMEND_DEFAULT_LIST } from "../../constants/RecommendProfile";
import { useNavigate } from "react-router-dom";
import NoticePop from "../../components/NoticePop";
type User = {
  userId: number;
  nickname: string;
  job: string;
  isMatched: boolean;
};
export default function RequestPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(
    RECOMMEND_DEFAULT_LIST.map(({ userId, nickname, job, isMatched }) => ({
      userId,
      nickname,
      job,
      isMatched,
    })),
  );
  const [showNotice, setShowNotice] = useState(false);
  const [selectedMateName, setSelectedMateName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleAccept = (profile: {
    userId: number;
    nickname: string;
    isMatched: boolean;
  }) => {
    if (profile.isMatched) {
      setSelectedMateName(profile.nickname);
      setSelectedUserId(profile.userId);
      setShowNotice(true);
      return;
    }

    navigate("/match");
  };
  const handleReject = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.userId !== userId));
  };
  const handleCloseNotice = () => {
    if (selectedUserId !== null) {
      setUsers((prev) => prev.filter((u) => u.userId !== selectedUserId));
    }

    setShowNotice(false);
    setSelectedMateName("");
    setSelectedUserId(null);
  };

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
