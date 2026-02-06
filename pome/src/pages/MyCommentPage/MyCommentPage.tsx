import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./MyCommentPage.style";
import Comment from "../../components/Comment";
import DetailHeader from "../../components/DetailHeader";
import TabBar from "../../components/TabBar";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import { DETAIL_DEFAULT_BY_CATEGORY } from "../../constants/defaultDetailItem";
import { getComments, ReadonlyComment } from "../../constants/comments";

export default function MyCommentPage() {
  const { category, id, field } = useParams<{
    category: CategoryKey;
    id?: string;
    field: string;
  }>();
  const navigate = useNavigate();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const safeCategory = category as CategoryKey;
  if (!safeCategory || !field) return null;
  const itemId = id ? Number(id) : undefined;

  const comments: ReadonlyComment[] = getComments(safeCategory, field, itemId);

  const items = DETAIL_DEFAULT_BY_CATEGORY[safeCategory] ?? [];
  const targetItem =
    itemId !== undefined
      ? (items.find((item) => item.id === itemId) ?? items[0])
      : items[0];

  const fieldLabel = CATEGORY_FIELDS[safeCategory]?.find(
    (f) => f.name === field,
  )?.label;

  let displayValue: string = "-";

  if (field === "period") {
    if (safeCategory === "activity") {
      displayValue =
        targetItem.period != null ? String(targetItem.period) : "-";
    } else {
      const start = targetItem.periodStart;
      const end = targetItem.periodEnd;
      if (start || end) {
        displayValue = `${start ?? ""} ~ ${end ?? "현재"}`;
      }
    }
  } else {
    const raw = targetItem[field as keyof typeof targetItem];
    displayValue =
      raw == null ? "-" : Array.isArray(raw) ? raw.join("\n") : String(raw);
  }
  const editCategory: CategoryKey =
    safeCategory === "experience" ? "education" : safeCategory;
  const goToEdit = () => {
    navigate(`/home/detail/${editCategory}`);
  };
  return (
    <>
      <S.PageWrapper>
        <DetailHeader category={safeCategory} showDown={false} />

        <S.ContentWrapper>
          <S.FormContainer>
            <S.FormFieldBox>{fieldLabel}</S.FormFieldBox>
            <S.FormBoard>{displayValue}</S.FormBoard>
          </S.FormContainer>

          <S.CommentContainer>
            <S.CommentRow>
              받은 댓글
              {comments.length > 0 && (
                <S.EditButton onClick={goToEdit}>
                  코멘트 반영하러 가기 →
                </S.EditButton>
              )}
            </S.CommentRow>

            <S.CommentBox>
              {comments.length === 0 ? (
                <S.NoCommentBox>아직 받은 댓글이 없어요.</S.NoCommentBox>
              ) : (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    content={comment.content}
                    readonly
                  />
                ))
              )}
            </S.CommentBox>

            <div ref={bottomRef} />
          </S.CommentContainer>
        </S.ContentWrapper>
      </S.PageWrapper>
      <TabBar />
    </>
  );
}
