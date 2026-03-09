import { jsonAxios, formDataAxios } from "../axios";
export interface PatchMyPageRequest {
  userName: string;
  nickName: string;
  introduction: string;
  job: string;
  matching: boolean;
  removeProfileImage?: boolean;
}
export const getMyPage = async () => {
  const res = await jsonAxios.get("/users/mypage");
  return res.data;
};
export const patchMyPage = async (data: PatchMyPageRequest, files?: File[]) => {
  const formData = new FormData();

  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );

  files?.forEach((file) => formData.append("file", file));

  const res = await formDataAxios.patch("/users/mypage", formData);

  return res.data;
};
export const getProfile = async () => {
  const res = await jsonAxios.get("/files/profile", {
    responseType: "blob",
  });
  const imageUrl = URL.createObjectURL(res.data);

  return imageUrl;
};
