export interface RecommendProfile {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  introduction: string;
  job: string;
  isMatched: boolean;
  tags: string[];
  aiSummary: string;
  heartCount: number;
}

export const RECOMMEND_DEFAULT_LIST: RecommendProfile[] = [
  {
    userId: 1,
    nickname: "구준회",
    introduction: "저 수상경력 어쩌구 저쩌구",
    job: "프론트엔드 개발자",
    isMatched: false,
    tags: ["프론트엔드개발자", "대기업러버"],
    aiSummary:
      "학회장, 프론트엔드 담당 프로젝트 3개, 해커톤 수상 4개, 직무 관련 자격증 소지",
    heartCount: 57,
  },
  {
    userId: 2,
    nickname: "전원우",
    introduction: "저 프로젝트 어쩌구 저쩌구",
    job: "프론트엔드 개발자",
    isMatched: false,
    tags: ["프론트엔드개발자", "대기업러버", "IT"],
    aiSummary:
      "프론트엔드 담당 프로젝트 4개, 해커톤 수상 2개, 직무 관련 자격증 소지",
    heartCount: 47,
  },
  {
    userId: 3,
    nickname: "이석민",
    introduction: "저 인턴 어쩌구 저쩌구",
    job: "프론트엔드 개발자",
    isMatched: true,
    tags: ["프론트엔드개발자", "대기업러버"],
    aiSummary:
      "인턴 경험, 프론트엔드 담당 프로젝트 3개, 해커톤 수상 4개, 직무 관련 자격증 소지",
    heartCount: 37,
  },
  {
    userId: 4,
    nickname: "부승관",
    introduction: "저 자격증 어쩌구 저쩌구",
    job: "프론트엔드 개발자",
    isMatched: false,
    tags: ["대기업러버", "대학재학생"],
    aiSummary:
      "부회장, 프론트엔드 담당 프로젝트 3개, 해커톤 수상 3개, 직무 관련 자격증 소지",
    heartCount: 27,
  },
  {
    userId: 5,
    nickname: "홍지수",
    introduction: "저 수상경력 어쩌구 저쩌구",
    job: "프론트엔드 개발자",
    isMatched: false,
    tags: ["프론트엔드개발자", "대기업러버", "대학재학생"],
    aiSummary:
      "프론트엔드 담당 프로젝트 2개, 해커톤 수상 5개, 직무 관련 자격증 소지,프론트엔드 담당 프로젝트 2개, 해커톤 수상 5개, 직무 관련 자격증 소지",
    heartCount: 17,
  },
];
