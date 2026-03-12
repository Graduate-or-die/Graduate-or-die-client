import { jsonAxios, formDataAxios } from "../axios";
export interface EducationRequest {
  school: string;
  major: string;
  degree: string;
}
export interface ExperienceRequest {
  workplace: string;
  spot: string;
  experienceStartAt: string;
  experienceEndAt: string;
}
export const getPortfolio = async (typeId: number) => {
  const res = await jsonAxios.get("/portfolios", {
    params: { typeId },
  });
  return res.data.result;
};
export const deletePortfolio = async (typeId: number, blockId: number) => {
  const res = await jsonAxios.delete("/portfolios", {
    params: { typeId },
  });
  return res.data.result;
};
export const postEducations = async (data: EducationRequest) => {
  const res = await jsonAxios.post("/portfolios/educations", data);
  return res.data;
};
export const patchEducations = async (data: EducationRequest) => {
  const res = await jsonAxios.patch("/portfolios/educations", data);
  return res.data;
};
export const postExperiences = async (data: ExperienceRequest) => {
  const res = await jsonAxios.post("/portfolios/experiences", data);
  return res.data;
};
export const patchExperiences = async (
  blockId: number,
  data: ExperienceRequest,
) => {
  const res = await jsonAxios.patch("/portfolios/experiences", data, {
    params: { blockId },
  });
  return res.data;
};
