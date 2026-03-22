import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./CommentPage.style";
import Comment from "../../components/Comment";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import Input from "../../components/Input";
import { Etc } from "../../icons";
import CommentPop from "../../components/CommentPop";
import { getMatePortfolio } from "../../apis/mate";

export default function CommentPage() {
  const CATEGORY_TYPE_ID: Record<CategoryKey, number> = {
    education: 1,
    experience: 2,
    activity: 3,
    award: 4,
    qualification: 5,
    project: 6,
    etc: 7,
  };

  const { category, blockId, fieldKey } = useParams<{
    category: CategoryKey;
    blockId: string;
    fieldKey: string;
  }>();

  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [comments, setComments] = useState<
    { id: number; content: string; createdAt: string }[]
  >([]);
  const [comment, setComment] = useState("");

  const [selectedCommentIds, setSelectedCommentIds] = useState<number[]>([]);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const popRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const safeCategory = category as CategoryKey;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    if (!safeCategory) return;

    const fetchData = async () => {
      try {
        const typeId = CATEGORY_TYPE_ID[safeCategory];
        const res = await getMatePortfolio(typeId);
        setPortfolio(res.item.items || []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [safeCategory]);

  if (!category || !blockId || !fieldKey) return null;

  if (portfolio.length === 0) {
    return <div>로딩중...</div>;
  }

  const targetItem = portfolio.find((item) => item.blockId == Number(blockId));

  if (!targetItem) {
    return <div>데이터 없음</div>;
  }

  const fieldLabel =
    CATEGORY_FIELDS[safeCategory]?.find((f) => f.name === fieldKey)?.label ??
    "정보";

  const isPeriodCategory = ["experience", "activity", "project"].includes(
    safeCategory,
  );
  const getPeriodFieldNames = (category: CategoryKey) => {
    switch (category) {
      case "experience":
        return { start: "experienceStartAt", end: "experienceEndAt" };
      case "activity":
        return { start: "activityStartAt", end: "activityEndAt" };
      case "project":
        return { start: "projectStartAt", end: "projectEndAt" };
      default:
        return { start: "", end: "" };
    }
  };

  let displayValue = "-";

  if (isPeriodCategory) {
    const { start, end } = getPeriodFieldNames(safeCategory);

    const isPeriodField =
      fieldKey === start ||
      fieldKey === end ||
      fieldKey.toLowerCase().includes("period");

    if (isPeriodField) {
      const startValue = targetItem?.[start];
      const endValue = targetItem?.[end];

      displayValue =
        startValue || endValue
          ? `${startValue ?? ""} ~ ${endValue ?? "현재"}`
          : "-";
    } else {
      const raw = targetItem?.[fieldKey as keyof typeof targetItem];
      displayValue =
        raw == null ? "-" : Array.isArray(raw) ? raw.join("\n") : String(raw);
    }
  } else {
    const raw = targetItem?.[fieldKey as keyof typeof targetItem];
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
                    onDeleteSelect={() => setIsDeleteMode(true)}
                    onConfirmDelete={() => {
                      setComments((prev) =>
                        prev.filter(
                          (comment) => !selectedCommentIds.includes(comment.id),
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
  );
}
