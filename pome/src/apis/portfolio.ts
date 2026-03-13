import { formDataAxios } from "../axios";
export interface EducationRequest {
  school: string;
  major: string;
  degree: string;
  file?: File | null;
}
export interface ExperienceRequest {
  workplace: string;
  spot: string;
  experienceStartAt: string;
  experienceEndAt: string;
  file?: File | null;
}

export const getPortfolio = async (typeId: number) => {
  const res = await formDataAxios.get("/portfolios", {
    params: { typeId },
  });
  return res.data.result;
};

export const deletePortfolio = async (typeId: number, blockId: number) => {
  const res = await formDataAxios.delete("/portfolios", {
    params: { typeId, blockId },
  });
  return res.data.result;
};

// 학력 API
export const postEducations = async (data: EducationRequest) => {
  const formData = new FormData();
  const { file, ...rest } = data;
  formData.append(
    "data",
    new Blob([JSON.stringify(rest)], { type: "application/json" }),
  );

  if (file instanceof File) {
    formData.append("file", file);
  }

  const res = await formDataAxios.post("/portfolios/educations", formData);
  return res.data;
};

export const patchEducations = async (
  blockId: number,
  data: EducationRequest,
) => {
  const formData = new FormData();
  const { file, ...rest } = data;
  formData.append(
    "data",
    new Blob([JSON.stringify(rest)], { type: "application/json" }),
  );

  if (file instanceof File) {
    formData.append("file", file);
  }

  const res = await formDataAxios.patch(
    `/portfolios/educations/${blockId}`,
    formData,
  );
  return res.data;
};

// 경력 API
export const postExperiences = async (data: ExperienceRequest) => {
  const formData = new FormData();
  const { file, ...rest } = data;
  formData.append(
    "data",
    new Blob([JSON.stringify(rest)], { type: "application/json" }),
  );

  if (file instanceof File) {
    formData.append("file", file);
  }

  const res = await formDataAxios.post("/portfolios/experiences", formData);
  return res.data;
};

export const patchExperiences = async (
  blockId: number,
  data: ExperienceRequest,
) => {
  const formData = new FormData();
  const { file, ...rest } = data;
  formData.append(
    "data",
    new Blob([JSON.stringify(rest)], { type: "application/json" }),
  );

  if (file instanceof File) {
    formData.append("file", file);
  }

  const res = await formDataAxios.patch(
    `/portfolios/experiences/${blockId}`,
    formData,
  );
  return res.data;
};
