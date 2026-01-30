import React from "react";
import * as S from "./ChatDeletePop.style";
import { CommentDeleteAll } from "../../icons";
type ChatPopProps = {
  x: number;
  y: number;
  onDelete: () => void;
  onClose: () => void;
};
export default function ChatDeletePop({ x, y, onDelete,onClose }: ChatPopProps) {
  return (
    <>
      <S.PopContainer x={x} y={y}>
        <S.PopBox
          onClick={onDelete}
        >
          <CommentDeleteAll />
          <span>삭제</span>
        </S.PopBox>
        <S.PopBox onClick={onClose}>취소</S.PopBox>
      </S.PopContainer>
    </>
  );
}
