import { jsonAxios, formDataAxios } from "../axios";
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
export interface ActivityRequest {
  activityName: string;
  activityRole: string;
  activityStartAt: string;
  activityEndAt: string;
  result: string;
  file?: File | null;
}
export interface ProjectRequest {
  projectName: string;
  projectStartAt: string;
  projectEndAt: string;
  projectRole: string;
  projectDescription: string;
  projectAward: string;
  file?: File | null;
}
export interface AwardRequest {
  awardName: string;
  awardOrganization: string;
  awardAt: string;
  awardGrade: string;
  file?: File | null;
}

export interface QualificationRequest {
  qualificationName: string;
  qualificationOrganization: string;
  qualificationStartAt: string;
  qualificationEndAt: string;
  hasQualificationEndAt: boolean;
  score: string;
  file?: File | null;
}

export interface EtcRequest {
  link?: string;
  memo: string;
  file?: File | null;
}

const createFormData = (data: any) => {
  const formData = new FormData();
  const { file, ...rest } = data;

  formData.append(
    "data",
    new Blob([JSON.stringify(rest)], { type: "application/json" }),
  );

  if (file instanceof File) {
    formData.append("file", file);
  }

  return formData;
};

export const getVisibility = async () => {
  const res = await jsonAxios.get("/portfolios/visibility", {
    params: {
      limit: 3,
      typeIds: [1, 2, 3, 4, 5, 6, 7],
    },
  });

  return res.data.result;
};

export const postVisibility = async (typeId: number) => {
  const res = await jsonAxios.post("/portfolios/visibility", null, {
    params: { typeId },
  });

  return res.data.result;
};

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
  const res = await formDataAxios.post(
    "/portfolios/educations",
    createFormData(data),
  );
  return res.data;
};

export const patchEducations = async (
  blockId: number,
  data: EducationRequest,
) => {
  const res = await formDataAxios.patch(
    `/portfolios/educations/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

// 경력 API
export const postExperiences = async (data: ExperienceRequest) => {
  const res = await formDataAxios.post(
    "/portfolios/experiences",
    createFormData(data),
  );
  return res.data;
};

export const patchExperiences = async (
  blockId: number,
  data: ExperienceRequest,
) => {
  const res = await formDataAxios.patch(
    `/portfolios/experiences/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

// 대내외활동 API
export const postActivities = async (data: ActivityRequest) => {
  const res = await formDataAxios.post(
    "/portfolios/activities",
    createFormData(data),
  );
  return res.data;
};
export const patchActivities = async (
  blockId: number,
  data: ActivityRequest,
) => {
  const res = await formDataAxios.patch(
    `/portfolios/activities/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

// 프로젝트 API
export const postProjects = async (data: ProjectRequest) => {
  const res = await formDataAxios.post(
    "/portfolios/projects",
    createFormData(data),
  );
  return res.data;
};
export const patchProjects = async (blockId: number, data: ProjectRequest) => {
  const res = await formDataAxios.patch(
    `/portfolios/projects/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

// 수상 API
export const postAwards = async (data: AwardRequest) => {
  const res = await formDataAxios.post(
    "/portfolios/awards",
    createFormData(data),
  );
  return res.data;
};

export const patchAwards = async (blockId: number, data: AwardRequest) => {
  const res = await formDataAxios.patch(
    `/portfolios/awards/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

// 자격증 API
export const postCapacities = async (data: QualificationRequest) => {
  const res = await formDataAxios.post(
    "/portfolios/capacities",
    createFormData(data),
  );
  return res.data;
};

export const patchCapacities = async (
  blockId: number,
  data: QualificationRequest,
) => {
  const res = await formDataAxios.patch(
    `/portfolios/capacities/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

// 기타 API
export const postEtc = async (data: EtcRequest) => {
  const res = await formDataAxios.post("/portfolios/etc", createFormData(data));
  return res.data;
};

export const patchEtc = async (blockId: number, data: EtcRequest) => {
  const res = await formDataAxios.patch(
    `/portfolios/etc/${blockId}`,
    createFormData(data),
  );
  return res.data;
};

export const deleteAttachment = async (typeId: number, blockId: number) => {
  const res = await jsonAxios.delete("/portfolios/attachments", {
    params: {
      typeId,
      blockId,
    },
  });

  return res.data;
};
