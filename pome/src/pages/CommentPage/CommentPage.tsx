import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./CommentPage.style";
import Comment from "../../components/Comment";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import { DETAIL_DEFAULT_MATE_CATEGORY } from "../../constants/defaultDetailItem";
import Input from "../../components/Input";
import { Etc } from "../../icons";
import CommentPop from "../../components/CommentPop";
export default function CommentPage() {
  const { category, id, field } = useParams<{
    category: CategoryKey;
    id?: string;
    field: string;
  }>();
  const [comments, setComments] = useState<
    { id: number; content: string; createdAt: string }[]
  >([]);
  const [comment, setComment] = useState("");

  const [selectedCommentIds, setSelectedCommentIds] = useState<number[]>([]);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const popRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const safeCategory = category as CategoryKey;

  if (!safeCategory) return null;

  const items = DETAIL_DEFAULT_MATE_CATEGORY[safeCategory] ?? [];
  const targetItem = items.find((item) => item.id === Number(id)) ?? items[0];

  if (!targetItem) return null;

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

  const togglePop = () => setIsPopOpen((prev) => !prev);

  const handleAddComment = (content: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
    setComment("");
  };

  const handleDeleteAllComments = () => {
    setComments([]);
  };

  return (
    <>
      <S.PageWrapper>
        <DetailHeader category={safeCategory} />
        <S.ContentWrapper>
          <S.FormContainer>
            <S.FormFieldBox>{fieldLabel}</S.FormFieldBox>
            <S.FormBoard>{displayValue}</S.FormBoard>
          </S.FormContainer>
          <S.CommentContainer>
            <S.CommentRow>
              Comment
              <S.EtcBox>
                <Etc onClick={togglePop} />

                {isPopOpen && (
                  <S.Popup ref={popRef}>
                    <CommentPop
                      isDeleteMode={isDeleteMode}
                      onDeleteSelect={() => {
                        setIsDeleteMode(true);
                      }}
                      onConfirmDelete={() => {
                        setComments((prev) =>
                          prev.filter(
                            (comment) =>
                              !selectedCommentIds.includes(comment.id),
                          ),
                        );
                        setSelectedCommentIds([]);
                        setIsDeleteMode(false);
                        setIsPopOpen(false);
                      }}
                      onCancelDelete={() => {
                        setSelectedCommentIds([]);
                        setIsDeleteMode(false);
                        setIsPopOpen(false);
                      }}
                      onDeleteAll={() => {
                        handleDeleteAllComments();
                        setIsPopOpen(false);
                      }}
                    />
                  </S.Popup>
                )}
              </S.EtcBox>
            </S.CommentRow>
            <S.CommentBox>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  content={comment.content}
                  checked={selectedCommentIds.includes(comment.id)}
                  isDeleteMode={isDeleteMode}
                  onToggle={() => {
                    if (!isDeleteMode) return;
                    setSelectedCommentIds((prev) =>
                      prev.includes(comment.id)
                        ? prev.filter((id) => id !== comment.id)
                        : [...prev, comment.id],
                    );
                  }}
                />
              ))}
            </S.CommentBox>
            <div ref={bottomRef} />
          </S.CommentContainer>
        </S.ContentWrapper>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요."
          onSubmit={handleAddComment}
        />
      </S.PageWrapper>
    </>
  );
}
