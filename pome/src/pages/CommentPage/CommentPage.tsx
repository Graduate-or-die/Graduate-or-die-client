import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as S from "./CommentPage.style";
import Comment from "../../components/Comment";
import DetailHeader from "../../components/DetailHeader";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import Input from "../../components/Input";
import { Etc } from "../../icons";
import CommentPop from "../../components/CommentPop";
import { getMatePortfolio } from "../../apis/mate";
import {
  postComment,
  postCommentList,
  postCommentDelete,
} from "../../apis/comment";
const CATEGORY_TYPE_ID: Record<CategoryKey, number> = {
  education: 1,
  experience: 2,
  activity: 3,
  award: 4,
  qualification: 5,
  project: 6,
  etc: 7,
};
export default function CommentPage() {
  const { category, blockId, fieldKey } = useParams<{
    category: CategoryKey;
    blockId: string;
    fieldKey: string;
  }>();

  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [comments, setComments] = useState<
    { messageId: number; content: string }[]
  >([]);
  const [comment, setComment] = useState("");
  const [selectedCommentIds, setSelectedCommentIds] = useState<number[]>([]);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const safeCategory = category as CategoryKey;
  const location = useLocation();
  const mateId = location.state?.mateId;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    if (!safeCategory) return;
    const fetchPortfolio = async () => {
      const typeId = CATEGORY_TYPE_ID[safeCategory];
      const res = await getMatePortfolio(typeId);
      setPortfolio(res.item.items || []);
    };
    fetchPortfolio();
  }, [safeCategory]);

  useEffect(() => {
    if (!mateId || !safeCategory || !blockId || !fieldKey) return;
    const fetchComments = async () => {
      const typeId = CATEGORY_TYPE_ID[safeCategory];
      const res = await postCommentList(mateId, {
        typeId,
        blockId: Number(blockId),
        fieldKey,
      });
      setComments(res);
    };
    fetchComments();
  }, [mateId, safeCategory, blockId, fieldKey]);

  if (!category || !blockId || !fieldKey) return null;
  if (portfolio.length === 0) return <div>로딩중...</div>;

  const targetItem = portfolio.find((item) => item.blockId === Number(blockId));
  if (!targetItem) return <div>데이터 없음</div>;

  const fieldLabel =
    CATEGORY_FIELDS[safeCategory]?.find((f) => f.name === fieldKey)?.label ??
    "정보";

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

  const { start, end } = getPeriodFieldNames(safeCategory);

  const isPeriodField = fieldKey === start || fieldKey === end;

  if (isPeriodField) {
    const startValue = targetItem?.[start];
    const endValue = targetItem?.[end];

    displayValue =
      startValue || endValue
        ? `${startValue ?? ""} ~ ${endValue ?? "현재"}`
        : "-";
  } else {
    displayValue = targetItem?.[fieldKey] ?? "-";
  }

  const handleAddComment = async (content: string) => {
    if (!mateId) return;

    const typeId = CATEGORY_TYPE_ID[safeCategory];

    await postComment(mateId, {
      typeId,
      blockId: Number(blockId),
      fieldKey,
      content,
    });

    const updated = await postCommentList(mateId, {
      typeId,
      blockId: Number(blockId),
      fieldKey,
    });

    setComments(updated);
    setComment("");
  };

  const handleToggleComment = (id: number) => {
    setSelectedCommentIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDeleteComments = async (ids: number[]) => {
    if (!mateId || ids.length === 0) return;

    const typeId = CATEGORY_TYPE_ID[safeCategory];

    await Promise.all(
      ids.map((msgId) =>
        postCommentDelete(mateId, msgId, {
          typeId,
          blockId: Number(blockId),
          fieldKey,
        }),
      ),
    );

    const updated = await postCommentList(mateId, {
      typeId,
      blockId: Number(blockId),
      fieldKey,
    });

    setComments(updated);
    setSelectedCommentIds([]);
    setIsDeleteMode(false);
    setIsPopOpen(false);
  };

  const handleDeleteSelectedComments = async () => {
    if (selectedCommentIds.length === 0) {
      alert("댓글을 선택하세요");
      return;
    }
    await handleDeleteComments(selectedCommentIds);
  };

  const handleDeleteAllComments = async () => {
    const allIds = comments.map((c) => c.messageId);
    if (allIds.length === 0) return;
    await handleDeleteComments(allIds);
  };

  const handleDeleteSelect = () => {
    setSelectedCommentIds([]);
    setIsDeleteMode(true);
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
              <Etc onClick={() => setIsPopOpen((prev) => !prev)} />
              {isPopOpen && (
                <S.Popup>
                  <CommentPop
                    isDeleteMode={isDeleteMode}
                    onDeleteSelect={handleDeleteSelect}
                    onConfirmDelete={handleDeleteSelectedComments}
                    onCancelDelete={() => {
                      setSelectedCommentIds([]);
                      setIsDeleteMode(false);
                      setIsPopOpen(false);
                    }}
                    onDeleteAll={handleDeleteAllComments}
                  />
                </S.Popup>
              )}
            </S.EtcBox>
          </S.CommentRow>

          <S.CommentBox>
            {comments.map((c) => (
              <Comment
                key={c.messageId}
                id={c.messageId}
                content={c.content}
                checked={selectedCommentIds.includes(c.messageId)}
                isDeleteMode={isDeleteMode}
                onToggle={handleToggleComment}
              />
            ))}
          </S.CommentBox>

          <div ref={bottomRef} />
        </S.CommentContainer>
      </S.ContentWrapper>

      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글 입력"
        onSubmit={handleAddComment}
      />
    </S.PageWrapper>
  );
}
