import React, { useState } from "react";
import * as S from "./RequestPage.style";
import Header from "../../components/Header";
import RequestItem from "../../components/RequestItem";
import { RECOMMEND_DEFAULT_LIST } from "../../constants/RecommendProfile";
import { number } from "framer-motion";
type User = {
  userId: number;
  nickname: string;
  job: string;
};
export default function RequestPage() {
  const [users, setUsers] = useState<User[]>(
    RECOMMEND_DEFAULT_LIST.map(({ userId, nickname, job }) => ({
      userId,
      nickname,
      job,
    })),
  );
  const handleReject = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.userId !== userId));
  };
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
              job={user.job}
              onReject={handleReject}
            />
          ))}
        </S.ListContainer>
      </S.PageWrapper>
    </>
  );
}
