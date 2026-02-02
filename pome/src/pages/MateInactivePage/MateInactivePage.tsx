import React from "react";
import * as S from "./MateInactivePage.style";
import TabBar from "../../components/TabBar";
import { PomeOff } from "../../icons";
type Props = {
  variant: "chat" | "mate";
};
const CONTENT = {
  chat: {
    title: "채팅을 사용할 수 없어요\n설정에서 활성화해 보세요.",
  },
  mate: {
    title: "김혜림님은 메이트 비활성화 상태예요\n설정에서 활성화해 보세요.",
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
