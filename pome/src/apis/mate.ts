import { jsonAxios } from "../axios";

export const getMateRequests = async () => {
  const res = await jsonAxios.get("/mates/requests");
  return res.data;
};
export const postAcceptMate = async (mateId: number) => {
  const res = await jsonAxios.post(`/mates/${mateId}`);
  return res.data;
};
export const patchAcceptMate = async (mateId: number) => {
  const res = await jsonAxios.patch(`/mates/${mateId}`);
  return res.data;
};
export const postRequestMate = async (mateId: number) => {
  const res = await jsonAxios.post(`/mates/requests/${mateId}`);
  return res.data;
};
export const patchRejectMate = async (mateId: number) => {
  const res = await jsonAxios.patch(`/mates/requests/${mateId}`);
  return res.data;
};

export const getMateProfile = async () => {
  const res = await jsonAxios.get("/mates/profile");
  return res.data.result;
};
export const getMateExists = async () => {
  const res = await jsonAxios.get("/mates/exists");
  return res.data.result;
};
export const getProfileImage = async (userId: number) => {
  try {
    const res = await jsonAxios.get(`/files/profile/${userId}`, {
      responseType: "blob",
    });

    return URL.createObjectURL(res.data);
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.data?.code === 2116) {
      return null;
    }
    return null;
  }
};
export const deleteMate = async () => {
  const res = await jsonAxios.delete(`/mates`);
  return res.data;
};
export const getMateVisibility = async () => {
  const res = await jsonAxios.get("/mates/visibility", {
    params: {
      limit: 3,
      typeIds: [1, 2, 3, 4, 5, 6, 7],
    },
  });

  return res.data.result;
};
export const getMatching = async () => {
  const res = await jsonAxios.get("/matching");
  return res.data.result.users;
};
