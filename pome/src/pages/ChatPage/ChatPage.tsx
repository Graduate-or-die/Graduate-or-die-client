import React, { useState } from "react";
import * as S from "./ChatPage.style";
import { Message } from "../../types/message";
import ChatHeader from "../../components/ChatHeader";
import SpeechBubbleList from "../../components/SpeechBubblesList";
import SpeechBubbles from "../../components/SpeechBubbles";
import Input from "../../components/Input";
import TabBar from "../../components/TabBar";
export default function ChatPage() {
  const initialMessages: Message[] = [
    {
      id: "1",
      roomId: "room1",
      senderId: "me",
      content: "안녕!",
      createdAt: "2026-01-20T09:00:00Z",
      isMine: true,
    },
     {
      id: "2",
      roomId: "room1",
      senderId: "other",
      content: "안녕!",
      createdAt: "2026-01-20T09:01:00Z",
      isMine: false,
    },
    {
      id: "3",
      roomId: "room1",
      senderId: "other",
      content: "나는 피디가 될건데",
      createdAt: "2026-01-20T09:01:00Z",
      isMine: false,
    },
    {
      id: "4",
      roomId: "room1",
      senderId: "other",
      content: "자격증 더 필요한거 있을까?",
      createdAt: "2026-01-20T09:02:00Z",
      isMine: false,
    },
    {
      id: "5",
      roomId: "room1",
      senderId: "me",
      content: "아마 ㅇㅇ자격증은 필수일걸?",
      createdAt: "2026-01-20T09:02:00Z",
      isMine: true,
    },
    {
      id: "6",
      roomId: "room1",
      senderId: "other",
      content: "오 그렇구나",
      createdAt: "2026-01-20T09:03:00Z",
      isMine: false,
    },
    {
      id: "7",
      roomId: "room1",
      senderId: "me",
      content: "포메 정말 유용하다",
      createdAt: "2026-01-20T09:04:00Z",
      isMine: true,
    },
    {
      id: "8",
      roomId: "room1",
      senderId: "me",
      content: "^^",
      createdAt: "2026-01-20T09:04:00Z",
      isMine: true,
    },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <>
      <ChatHeader />
      <S.ChatContainer>
        <SpeechBubbleList
          messages={messages}
          onDelete={(id) =>
            setMessages((prev) => prev.filter((m) => m.id !== id))
          }
        />
      </S.ChatContainer>
      <Input
        placeholder="이야기를 시작해 보세요."
        onSubmit={(content) => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              roomId: "room1",
              senderId: "me",
              content,
              createdAt: new Date().toISOString(),
              isMine: true,
            },
          ]);
        }}
      />
    </>
  );
}
