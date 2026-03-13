import { Message } from "../types/message";
let mockMessages: Message[] = [];

export const chatService = {
  getMessages: async (roomId: string) => {
    await delay(300);
    return mockMessages;
  },

  sendMessage: async (message: Message) => {
    await delay(200);
    mockMessages.push(message);
    return message;
  },
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
