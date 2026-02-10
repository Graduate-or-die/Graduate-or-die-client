export type DetailValue = string | number | File | string[] | null | undefined;

export type CommentItem = {
  fieldName: string;
  content: string;
};

export type DetailItemBase = {
  id: number;
  links?: string[];
  comments?: CommentItem[];
};

export type DetailItem = DetailItemBase & {
  [key: string]: DetailValue | undefined;
};
