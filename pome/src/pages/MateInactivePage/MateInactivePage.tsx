import React from "react";
import * as S from "./MateInactivePage.style";
import TabBar from "../../components/TabBar";
import { PomeOff } from "../../icons";
type Props = {
  variant: "chat" | "mate" | "noMate";
};
const CONTENT = {
  chat: {
    title: "채팅을 사용할 수 없어요.\n매칭을 활성화해 주세요.",
  },
  mate: {
    title: "메이트 비활성화 상태예요.\n매칭을 활성화해 주세요.",
  },
  noMate: {
    title: "아직 매칭된 메이트가 없어요.\n메이트를 찾아보세요.",
  },
};
export default function MateInactivePage({ variant }: Props) {
  const { title } = CONTENT[variant];

  return (
    <>
      <S.PageContainer>
        <S.MateInactiveContainer>
          <S.PomeContainer>
            <PomeOff />
          </S.PomeContainer>
          <S.InactivePhrase>{title}</S.InactivePhrase>
        </S.MateInactiveContainer>
      </S.PageContainer>

      <TabBar />
    </>
  );
}
