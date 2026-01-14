import { CategoryKey } from "./categories";
import { v4 as uuid } from "uuid";

// 화면 확인용 디폴트 데이터
export const DETAIL_DEFAULT_BY_CATEGORY: Record<
  CategoryKey,
  Record<string, any>[]
> = {
  education: [
    {
      id: uuid(),
      school: "숙명여자대학교",
      major: "데이터사이언스",
      degree: "학사",
    },
  ],
  experience: [
    {
      id: uuid(),
      place: "구글",
      state: "사장",
      periodStart: "2026-03",
      periodEnd: "2026-08",
    },
  ],

  activity: [
    {
      id: uuid(),
      name: "프론트엔드 스터디",
      role: "팀원",
      period: "2024.03 ~ 2024.06",
      result: "React 프로젝트 3회 진행",
    },
    {
      id: uuid(),
      name: "ai 스터디",
      role: "팀장",
      period: "2025.03 ~ 2025.06",
      result: "ai 프로젝트 3회 진행",
    },
  ],

  award: [
    {
      id: uuid(),
      title: "해커톤",
      organization: "숙명여대",
      date: "2023-11-10",
      grade: "금상",
      file: null,
    },
    {
      id: uuid(),
      title: "많이먹기대회",
      organization: "졸못죽",
      date: "2023-11-10",
      grade: "대상",
      file: null,
    },
  ],

  certificate: [
    {
      id: uuid(),
      name: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2023-06-01",
      expiration: "2028-06-01",
      grade: "필기/실기 합격",
      file: null,
    },
    {
      id: uuid(),
      name: "sqld",
      issuer: "한국데이터산업",
      date: "2024-06-01",
      expiration: null,
      grade: "필기/실기 합격",
      file: null,
    },
  ],

  project: [
    {
      id: uuid(),
      name: "포트폴리오관리 서비스",
      periodStart: "2025-07",
      periodEnd: "2026-02",
      role: "프론트엔드 개발",
      description: "이력서를 작성·관리하는 웹 서비스",
      result: "사용자 500명 확보",
    },
  ],

  etc: [
    {
      id: uuid(),
      content: ["https://github.com/username", "https://instagram/username"],
      memo: "포트폴리오 링크",
    },
  ],
};

export const DETAIL_DEFAULT_MATE_CATEGORY: Record<
  CategoryKey,
  Record<string, any>[]
> = {
  education: [
    {
      id: uuid(),
      school: "숙명여자대학교",
      major: "데이터사이언스",
      degree: "학사",
    },
  ],
  experience: [
    {
      id: uuid(),
      place: "네이버",
      state: "인턴",
      periodStart: "2026-03",
      periodEnd: "2026-08",
    },
  ],

  activity: [
    {
      id: uuid(),
      name: "프론트엔드 스터디",
      role: "팀원",
      period: "2024.03 ~ 2024.06",
      result: "React 프로젝트 3회 진행",
    },
  ],

  award: [
    {
      id: uuid(),
      title: "해커톤",
      organization: "숙명여대",
      date: "2023-11-10",
      grade: "대상",
      file: null,
    },
  ],

  certificate: [
    {
      id: uuid(),
      name: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2023-06-01",
      expiration: "2028-06-01",
      grade: "필기/실기 합격",
      file: null,
    },
    {
      id: uuid(),
      name: "sqld",
      issuer: "한국데이터산업",
      date: "2024-06-01",
      expiration: null,
      grade: "필기/실기 합격",
      file: null,
    },
  ],

  project: [
    {
      id: uuid(),
      name: "포트폴리오관리 서비스",
      periodStart: "2025-07",
      periodEnd: "2026-02",
      role: "프론트엔드 개발",
      description: "이력서를 작성·관리하는 웹 서비스",
      result: "사용자 500명 확보",
    },
  ],

  etc: [
    {
      id: uuid(),
      content: ["https://github.com/username", "https://instagram/username"],
      memo: "포트폴리오 링크",
    },
  ],
};
