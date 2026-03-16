import { CategoryKey } from "./categories";

export const DETAIL_DEFAULT_BY_CATEGORY: Record<CategoryKey, any[]> = {
  education: [
    {
      id: 1,
      school: "숙명여자대학교",
      major: "데이터사이언스",
      degree: "학사",
    },
  ],

  experience: [
    {
      id: 1,
      workplace: "구글",
      spot: "사장",
      experienceStartAt: "2026-03",
      experienceEndAt: "2026-08",
    },
  ],

  activity: [
    {
      id: 1,
      activityName: "프론트엔드 스터디",
      activityRole: "팀원",
      activityStartAt: "2024-03",
      activityEndAt: "2024-06",
      result: "React 프로젝트 3회 진행",
    },
    {
      id: 2,
      activityName: "AI 스터디",
      activityRole: "팀장",
      activityStartAt: "2025-03",
      activityEndAt: "2025-06",
      result: "AI 프로젝트 3회 진행",
    },
  ],

  award: [
    {
      id: 1,
      awardName: "해커톤",
      awardOrganization: "숙명여대",
      awardAt: "2023-11-10",
      awardGrade: "금상",
      file: null,
    },
    {
      id: 2,
      awardName: "많이먹기대회",
      awardOrganization: "졸못죽",
      awardAt: "2023-11-10",
      awardGrade: "대상",
      file: null,
    },
  ],

  qualification: [
    {
      id: 1,
      qualificationName: "정보처리기사",
      qualificationOrganization: "한국산업인력공단",
      qualificationStartAt: "2023-06-01",
      qualificationEndAt: "2028-06-01",
      hasQualificationEndAt: true,
      score: "필기/실기 합격",
      file: null,
    },
    {
      id: 2,
      qualificationName: "SQLD",
      qualificationOrganization: "한국데이터산업",
      qualificationStartAt: "2024-06-01",
      qualificationEndAt: "",
      hasQualificationEndAt: false,
      score: "합격",
      file: null,
    },
  ],

  project: [
    {
      id: 1,
      projectName: "포트폴리오관리 서비스",
      projectStartAt: "2025-07",
      projectEndAt: "2026-02",
      projectRole: "프론트엔드 개발",
      projectDescription: "이력서를 작성·관리하는 웹 서비스",
      projectAward: "사용자 500명 확보",
    },
  ],

  etc: [
    {
      id: 1,
      link: [
        "https://github.com/username",
        "https://instagram.com/username",
      ],
      memo: "포트폴리오 링크",
    },
  ],
};

export const DETAIL_DEFAULT_MATE_CATEGORY: Record<CategoryKey, any[]> = {
  education: [
    {
      id: 1,
      school: "숙명여자대학교(메이트)",
      major: "데이터사이언스",
      degree: "학사",
    },
  ],

  experience: [
    {
      id: 1,
      workplace: "네이버(메이트)",
      spot: "인턴",
      experienceStartAt: "2026-03",
      experienceEndAt: "2026-08",
    },
  ],

  activity: [
    {
      id: 1,
      activityName: "프론트엔드 스터디(메이트)",
      activityRole: "팀원",
      activityStartAt: "2024-03",
      activityEndAt: "2024-06",
      result: "React 프로젝트 3회 진행",
    },
  ],

  award: [
    {
      id: 1,
      awardName: "해커톤(메이트)",
      awardOrganization: "숙명여대",
      awardAt: "2023-11-10",
      awardGrade: "대상",
      file: null,
    },
  ],

  qualification: [
    {
      id: 1,
      qualificationName: "정보처리기사(메이트)",
      qualificationOrganization: "한국산업인력공단",
      qualificationStartAt: "2023-06-01",
      qualificationEndAt: "2028-06-01",
      hasQualificationEndAt: true,
      score: "합격",
      file: null,
    },
  ],

  project: [
    {
      id: 1,
      projectName: "포트폴리오관리 서비스(메이트)",
      projectStartAt: "2025-07",
      projectEndAt: "2026-02",
      projectRole: "프론트엔드 개발",
      projectDescription: "이력서를 작성·관리하는 웹 서비스",
      projectAward: "사용자 500명 확보",
    },
  ],

  etc: [
    {
      id: 1,
      link: [
        "https://github.com/username(메이트)",
        "https://instagram.com/username(메이트)",
      ],
      memo: "포트폴리오 링크(메이트)",
    },
  ],
};