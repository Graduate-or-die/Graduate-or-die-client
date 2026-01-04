export type DetailValue =
  | string
  | number
  | File
  | string[]
  | null
  | undefined;

export type DetailItem = {
  id: string;
  links?: string[];
} & Record<string, DetailValue>;
