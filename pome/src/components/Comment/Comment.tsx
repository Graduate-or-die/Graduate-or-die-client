import React from "react";
import * as S from "./Comment.style";
import { CommentProfile } from "../../assets";
import { CategoryKey } from "../../constants/categories";
type Comment = {
  id: string;
  category: CategoryKey;
  itemId: string;
  field: string;
  content: string;
};
type CommentProps = {
  content: string;
  checked: boolean;
  isDeleteMode: boolean;
  onToggle: () => void;
};

export default function Comment({
  content,
  checked,
  isDeleteMode,
  onToggle,
}: CommentProps) {
  return (
    <>
      <S.CommentContainer
        onClick={onToggle}
        $checked={checked}
        $deleteMode={isDeleteMode}
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
