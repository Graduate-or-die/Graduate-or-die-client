import { CategoryKey } from "./categories";
export type FieldGroup = "education" | "experience";

export type Field = {
  name: string;
  label: string;
  placeholder?: string;
  kind?: "text" | "period" | "file" | "textarea" | "memo" | "link" | "expr";
  group?: FieldGroup;
};

export const CATEGORY_FIELDS: Record<CategoryKey, Field[]> = {
  education: [
    { name: "school", label: "학교", group: "education" },
    { name: "major", label: "전공", group: "education" },
    { name: "degree", label: "학위", group: "education" },

    { name: "place", label: "근무지", group: "experience" },
    { name: "state", label: "직위", group: "experience" },
    { name: "period", label: "근무기간", kind: "period", group: "experience" },
  ],
  activity: [
    { name: "name", label: "활동명" },
    { name: "role", label: "역할" },
    { name: "period", label: "기간" },
    { name: "result", label: "성과", kind: "textarea" },
  ],
  award: [
    { name: "title", label: "대회명" },
    { name: "organization", label: "주최기관" },
    { name: "date", label: "수상일자" },
    { name: "grade", label: "시상등급" },
    { name: "file", label: "상장", kind: "file" },
  ],

  certificate: [
    { name: "name", label: "자격증명" },
    { name: "issuer", label: "발급기관" },
    { name: "date", label: "취득일자" },
    { name: "expiration", label: "만료일자", kind: "expr" },
    { name: "grade", label: "등급/점수" },
    { name: "file", label: "자격증", kind: "file" },
  ],
  project: [
    { name: "name", label: "프로젝트명" },
    { name: "period", label: "진행기간", kind: "period" },
    { name: "role", label: "프로젝트 역할" },
    { name: "description", label: "프로젝트 설명", kind: "textarea" },
    { name: "result", label: "프로젝트 성과", kind: "textarea" },
  ],
  etc: [
    { name: "content", label: "링크", kind: "link" },
    { name: "memo", label: "메모", kind: "memo" },
  ],
};

