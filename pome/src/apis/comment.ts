import { jsonAxios } from "../axios";
export const postComment = async (
  portfolioOwnerId: number,
  body: {
    typeId: number;
    blockId: number;
    fieldKey: string;
    content: string;
  },
) => {
  const res = await jsonAxios.post(`/chats/${portfolioOwnerId}`, body);
  return res.data.result;
};

export const postCommentList = async (
  portfolioOwnerId: number,
  body: {
    typeId: number;
    blockId: number;
    fieldKey: string;
  },
  params?: {
    page?: number;
    size?: number;
    sort?: string[];
  },
) => {
  const res = await jsonAxios.post(`/chats/list/${portfolioOwnerId}`, body, {
    params: {
      page: params?.page ?? 0,
      size: params?.size ?? 50,
      sort: params?.sort ?? ["id,ASC"],
    },
  });
  return res.data.result;
};

export const postCommentDelete = async (
  portfolioOwnerId: number,
  messageId: number,
  body: {
    typeId: number;
    blockId: number;
    fieldKey: string;
  },
) => {
  const res = await jsonAxios.post(
    `/chats/delete/${portfolioOwnerId}/${messageId}`,
    body,
  );
  return res.data.result;
};
