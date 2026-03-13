import { jsonAxios } from "../axios";
export const getMessages = async (page = 0, size = 50) => {
  const res = await jsonAxios.get("/messages", {
    params: {
      page,
      size,
    },
  });

  return res.data.result;
};
export const postMessage = async (content: string) => {
  const res = await jsonAxios.post("/messages", {
    content,
  });
  return res.data.result;
};
