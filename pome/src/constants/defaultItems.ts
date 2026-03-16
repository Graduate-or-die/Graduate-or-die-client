import { DetailItem } from "../types/detail";

export const defaultItems: Record<string, DetailItem> = {
  education: {
    type: "education",
    school: "",
    major: "",
    degree: "",
  },

  experience: {
    type: "experience",
    workplace: "",
    spot: "",
    experienceStartAt: "",
    experienceEndAt: "",
  },

  activity: {
    type: "activity",
    activityName: "",
    activityRole: "",
    activityStartAt: "",
    activityEndAt: "",
    result: "",
  },

  project: {
    type: "project",
    projectName: "",
    projectStartAt: "",
    projectEndAt: "",
    projectRole: "",
    projectDescription: "",
    projectAward: "",
  },

  award: {
    type: "award",
    awardName: "",
    awardOrganization: "",
    awardAt: "",
    awardGrade: "",
  },

  qualification: {
    type: "qualification",
    qualificationName: "",
    qualificationOrganization: "",
    qualificationStartAt: "",
    qualificationEndAt: "",
    hasQualificationEndAt: false,
    score: "",
  },

  etc: {
    type: "etc",
    link: [],
    memo: "",
  },
};