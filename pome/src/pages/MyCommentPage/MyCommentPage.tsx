import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./MyCommentPage.style";
import Comment from "../../components/Comment";
import DetailHeader from "../../components/DetailHeader";
import TabBar from "../../components/TabBar";
import { CategoryKey } from "../../constants/categories";
import { CATEGORY_FIELDS } from "../../constants/categoryFields";
import { getPortfolio } from "../../apis/portfolio";
import { postCommentList, postFieldsRead } from "../../apis/comment";

const CATEGORY_TYPE_ID: Record<CategoryKey, number> = {
  education: 1,
  experience: 2,
  activity: 3,
  award: 4,
  qualification: 5,
  project: 6,
  etc: 7,
};

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
  const [loadingComments, setLoadingComments] = useState(false);

  const safeCategory = category as CategoryKey;
  const myUserId = Number(localStorage.getItem("userId"));
  const readCalledRef = useRef(false);

  const getRealFieldKeys = (category: CategoryKey, fieldKey: string) => {
    if (fieldKey !== "period") return [fieldKey];

    switch (category) {
      case "experience":
        return ["experienceStartAt", "experienceEndAt"];
      case "activity":
        return ["activityStartAt", "activityEndAt"];
      case "project":
        return ["projectStartAt", "projectEndAt"];
      default:
        return [];
    }
  };

  const handleRead = useCallback(async () => {
    if (readCalledRef.current) return;
    readCalledRef.current = true;

    if (!safeCategory || !blockId || !fieldKey) return;

    const typeId = CATEGORY_TYPE_ID[safeCategory];
    const numericBlockId = Number(blockId);

    if (!myUserId || !typeId || isNaN(numericBlockId)) return;

    try {
      const realFieldKeys = getRealFieldKeys(safeCategory, fieldKey);

      await Promise.all(
        realFieldKeys.map((key) =>
          postFieldsRead(myUserId, {
            typeId,
            blockId: numericBlockId,
            fieldKey: key,
          }),
        ),
      );
    } catch (e) {
      console.error("read 실패", e);
    }
  }, [myUserId, safeCategory, blockId, fieldKey]);

  useEffect(() => {
    if (!safeCategory) return;

    const fetchPortfolio = async () => {
      try {
        const typeId = CATEGORY_TYPE_ID[safeCategory];
        const res = await getPortfolio(typeId);
        setPortfolio(res?.item?.items ?? []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPortfolio();
  }, [safeCategory]);

  useEffect(() => {
    return () => {
      handleRead();
    };
  }, [handleRead]);

  useEffect(() => {
    const handlePopState = () => {
      handleRead();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handleRead]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    if (!safeCategory || !blockId || !fieldKey || !myUserId) return;

    const fetchComments = async () => {
      setLoadingComments(true);

      const typeId = CATEGORY_TYPE_ID[safeCategory];
      const numericBlockId = Number(blockId);

      try {
        const realFieldKeys = getRealFieldKeys(safeCategory, fieldKey);

        const results = await Promise.all(
          realFieldKeys.map((key) =>
            postCommentList(myUserId, {
              typeId,
              blockId: numericBlockId,
              fieldKey: key,
            }),
          ),
        );

        setComments(results.flatMap((res) => res || []));
      } catch (e) {
        console.error("댓글 조회 실패", e);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [myUserId, safeCategory, blockId, fieldKey]);

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

  if (fieldKey === "period") {
    const startValue = targetItem?.[start];
    const endValue = targetItem?.[end];
    displayValue =
      startValue || endValue
        ? `${startValue ?? ""} ~ ${endValue ?? "현재"}`
        : "-";
  } else {
    displayValue = targetItem?.[fieldKey] ?? "-";
  }

  const goToEdit = async () => {
    await handleRead();
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
              {loadingComments ? (
                <S.NoCommentBox>댓글 불러오는 중...</S.NoCommentBox>
              ) : comments.length === 0 ? (
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
