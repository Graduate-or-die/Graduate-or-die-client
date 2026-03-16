export type DetailValue = string | number | File | string[] | null | undefined;

export type CommentItem = {
  fieldName: string;
  content: string;
};

export type BaseItem = {
  id?: number;
  blockId?: number;
  file?: File | string | null;
  comments?: string[];
};

export type EducationItem = BaseItem & {
  type: "education";
  school: string;
  major: string;
  degree: string;
};

export type ExperienceItem = BaseItem & {
  type: "experience";
  workplace: string;
  spot: string;
  experienceStartAt: string;
  experienceEndAt: string;
};

export type ActivityItem = BaseItem & {
  type: "activity";
  activityName: string;
  activityRole: string;
  activityStartAt: string;
  activityEndAt: string;
  result: string;
};

export type ProjectItem = BaseItem & {
  type: "project";
  projectName: string;
  projectStartAt: string;
  projectEndAt: string;
  projectRole: string;
  projectDescription: string;
  projectAward: string;
};

export type AwardItem = BaseItem & {
  type: "award";
  awardName: string;
  awardOrganization: string;
  awardAt: string;
  awardGrade: string;
};

export type QualificationItem = BaseItem & {
  type: "qualification";
  qualificationName: string;
  qualificationOrganization: string;
  qualificationStartAt: string;
  qualificationEndAt: string;
  hasQualificationEndAt: boolean;
  score: string;
};

export type EtcItem = BaseItem & {
  type: "etc";
  link: string[];
  memo: string;
};

export type DetailItem =
  | EducationItem
  | ExperienceItem
  | ActivityItem
  | ProjectItem
  | AwardItem
  | QualificationItem
  | EtcItem;
