export const CATEGORIES = {
  education: "학력/경력",
  activity: "대·내외 활동",
  award: "수상경력",
  certificate: "자격증",
  project: "프로젝트",
  etc: "기타",
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
