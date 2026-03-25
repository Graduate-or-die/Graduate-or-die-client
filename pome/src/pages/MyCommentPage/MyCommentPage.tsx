import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./MyCommentPage.style";
import Comment from "../../components/Comment";
import DetailHeader from "../../components/DetailHeader";
import TabBar from "../../components/TabBar";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import { getPortfolio } from "../../apis/portfolio";
import { postCommentList } from "../../apis/comment";

export default function MyCommentPage() {
  const { category, blockId, fieldKey } = useParams<{
    category: CategoryKey;
    blockId: string;
    fieldKey: string;
  }>();

  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  const safeCategory = category as CategoryKey;

  const CATEGORY_TYPE_ID: Record<CategoryKey, number> = {
    education: 1,
    experience: 2,
    activity: 3,
    award: 4,
    qualification: 5,
    project: 6,
    etc: 7,
  };
  const myUserId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!safeCategory) return;

        const typeId = CATEGORY_TYPE_ID[safeCategory];
        const res = await getPortfolio(typeId);

        setPortfolio(res?.item?.items ?? []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [safeCategory]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!myUserId || !safeCategory || !blockId || !fieldKey) return;

        const typeId = CATEGORY_TYPE_ID[safeCategory];

        const res = await postCommentList(myUserId, {
          typeId,
          blockId: Number(blockId),
          fieldKey,
        });
        console.log(res);
        setComments(res ?? []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchComments();
  }, [myUserId, safeCategory, blockId, fieldKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

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
      const raw = targetItem?.[fieldKey];
      displayValue =
        raw == null ? "-" : Array.isArray(raw) ? raw.join("\n") : String(raw);
    }
  } else {
    const raw = targetItem?.[fieldKey];
    displayValue =
      raw == null ? "-" : Array.isArray(raw) ? raw.join("\n") : String(raw);
  }

  const goToEdit = () => {
    navigate(`/home/detail/${safeCategory}`);
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
                comments.map((c) => (
                  <Comment key={c.messageId} content={c.content} isReadonly />
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
