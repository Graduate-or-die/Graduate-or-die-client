export type DetailValue = string | number | File | string[] | null | undefined;

export type CommentItem = {
  fieldName: string;
  content: string;
};

export type DetailItemBase = {
  id?: number;
  educationId?: number;
  experienceId?: number;
  links?: string[];
  comments?: string[];
  localId?: string;
};

export type DetailItem = DetailItemBase & {
  [key: string]: DetailValue | undefined;
};
