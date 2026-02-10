export type Message = {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isMine: boolean;
};
