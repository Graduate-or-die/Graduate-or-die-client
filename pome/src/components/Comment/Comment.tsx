import React from "react";
import * as S from "./Comment.style";
import { CommentProfile } from "../../assets";

type CommentProps = {
  content: string;
  checked?: boolean;
  isDeleteMode?: boolean;
  onToggle?: () => void;
  readonly?: boolean;
};

export default function Comment({
  content,
  checked = false,
  isDeleteMode = false,
  onToggle,
  readonly = false,
}: CommentProps) {
  return (
    <>
      <S.CommentContainer
        onClick={readonly ? undefined : onToggle}
        $checked={!readonly && checked}
        $deleteMode={!readonly && isDeleteMode}
      >
        <S.CommentRow>
          <S.ProfileBox>
            <CommentProfile />
          </S.ProfileBox>
          <S.CommentBox>{content}</S.CommentBox>
        </S.CommentRow>
      </S.CommentContainer>
    </>
  );
}
