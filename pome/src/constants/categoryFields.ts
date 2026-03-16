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
    { name: "school", label: "학교" },
    { name: "major", label: "전공" },
    { name: "degree", label: "학위" },
  ],
  experience: [
    { name: "workplace", label: "근무지" },
    { name: "spot", label: "직위" },
    { name: "experiencePeriod", label: "근무기간", kind: "period" },
  ],
  activity: [
    { name: "activityName", label: "활동명" },
    { name: "activityRole", label: "역할" },
    { name: "activityperiod", label: "기간", kind: "period" },
    { name: "result", label: "성과", kind: "textarea" },
  ],
  award: [
    { name: "awardName", label: "대회명" },
    { name: "awardOrganization", label: "주최기관" },
    { name: "awardAt", label: "수상일자" },
    { name: "awardGrade", label: "시상등급" },
    { name: "file", label: "상장", kind: "file" },
  ],
  qualification: [
    { name: "qualificationName", label: "자격증명" },
    { name: "qualificationOrganization", label: "발급기관" },
    { name: "qualificationStartAt", label: "취득일자" },
    { name: "qualificationEndAt", label: "만료일자", kind: "expr" },
    { name: "score", label: "등급/점수" },
    { name: "file", label: "자격증", kind: "file" },
  ],
  project: [
    { name: "projectName", label: "프로젝트명" },
    { name: "projectPeriod", label: "진행기간", kind: "period" },
    { name: "projectRole", label: "프로젝트 역할" },
    { name: "projectDescription", label: "프로젝트 설명", kind: "textarea" },
    { name: "projectAward", label: "프로젝트 성과", kind: "textarea" },
  ],
  etc: [
    { name: "link", label: "링크", kind: "link" },
    { name: "memo", label: "메모", kind: "memo" },
  ],
};
