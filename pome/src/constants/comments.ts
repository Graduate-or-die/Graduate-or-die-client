import { CategoryKey } from "./categories";
export type ReadonlyComment = {
  id: number;
  content: string;
};

export type CommentKey = {
  category: CategoryKey;
  itemId?: number; 
  field: string;
};
const makeCommentKey = (
  category: CategoryKey,
  field: string,
  itemId?: number,
) => `${category}:${itemId ?? 1}:${field}`;

type CommentMap = Record<string, ReadonlyComment[]>;

const COMMENT_MAP: CommentMap = {
   "education:1:major": [
    {
      id: 1,
      content: "진로와 전공이 잘 맞아서 좋아요!",
    },
  ],

  "certificate:1:name": [
    {
      id: 1,
      content: "오 벌써 따셨네요",
    },
    {
      id: 2,
      content: "저도 상반기에 따려고요!",
    },
  ],
};

export const getComments = (
  category: CategoryKey,
  field: string,
  itemId?: number,
): ReadonlyComment[] => {
  const key = makeCommentKey(category, field, itemId);
  return COMMENT_MAP[key] ?? [];
};

export const hasComment = (
  category: CategoryKey,
  field: string,
  itemId?: number,
): boolean => {
  return getComments(category, field, itemId).length > 0;
};

