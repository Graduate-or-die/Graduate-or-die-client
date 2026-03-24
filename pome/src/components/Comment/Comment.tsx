import React from "react";
import * as S from "./Comment.style";
import { CommentProfile } from "../../assets";

type CommentProps = {
  id?: number;
  content: string;
  checked?: boolean;
  isDeleteMode?: boolean;
  onToggle?: (id: number) => void;
  isReadonly?: boolean;
};

export default function Comment({
  id,
  content,
  checked = false,
  isDeleteMode = false,
  onToggle,
  isReadonly = false,
}: CommentProps) {
  return (
    <S.CommentContainer
      onClick={() => {
        if (!isReadonly && isDeleteMode && id != null) {
          onToggle?.(id);
        }
      }}
      $checked={!isReadonly && checked}
      $deleteMode={!isReadonly && isDeleteMode}
    >
      <S.CommentRow>
        <S.ProfileBox>
          <CommentProfile />
        </S.ProfileBox>
        <S.CommentBox>{content}</S.CommentBox>
      </S.CommentRow>
    </S.CommentContainer>
  );
}
