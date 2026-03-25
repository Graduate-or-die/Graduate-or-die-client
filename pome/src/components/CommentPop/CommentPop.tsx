import React from "react";
import * as S from "./CommentPop.style";
import { CommentDeleteSelect, CommentDeleteAll } from "../../icons";

type CommentPopProps = {
  isDeleteMode: boolean;
  onDeleteSelect: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onDeleteAll: () => void;
};

export default function CommentPop({
  isDeleteMode,
  onDeleteSelect,
  onConfirmDelete,
  onCancelDelete,
  onDeleteAll,
}: CommentPopProps) {
  return (
    <S.PopContainer>
      {!isDeleteMode ? (
        <>
          <S.PopBox onClick={onDeleteSelect}>
            <CommentDeleteSelect />
            선택삭제
          </S.PopBox>
          <S.PopBox onClick={onDeleteAll}>
            <CommentDeleteAll />
            전체삭제
          </S.PopBox>
        </>
      ) : (
        <>
          <S.PopBox onClick={onConfirmDelete}>
            <CommentDeleteAll />
            삭제하기
          </S.PopBox>
          <S.PopBox $cancel onClick={onCancelDelete}>
            취소
          </S.PopBox>
        </>
      )}
    </S.PopContainer>
  );
}