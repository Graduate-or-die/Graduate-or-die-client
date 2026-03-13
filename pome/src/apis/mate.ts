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