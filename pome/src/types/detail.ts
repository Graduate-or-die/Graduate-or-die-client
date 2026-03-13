export type DetailValue = string | number | File | string[] | null | undefined;

export type CommentItem = {
  fieldName: string;
  content: string;
};

export type DetailItemBase = {
  id?: number;
  blockId?: number;
  links?: string[];
  comments?: string[];
};

export type DetailItem = DetailItemBase & {
  file?: File | string | null;
  [key: string]: DetailValue | undefined;
};
