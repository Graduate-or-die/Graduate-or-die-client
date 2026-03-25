import { jsonAxios } from "../axios";

export const postInterview = async (): Promise<string[]> => {
  try {
    const res = await jsonAxios.post("/admin/interview-questions/generate");
    return res.data || [];
  } catch (error) {
    console.error("AI 면접 질문 생성 실패:", error);
    return [];
  }
};
