import React, { useState, useRef, useEffect } from "react";
import * as S from "./ChatPage.style";
import { Message } from "../../types/message";
import ChatHeader from "../../components/ChatHeader";
import SpeechBubbleList from "../../components/SpeechBubblesList";
import Input from "../../components/Input";
import AIquestion from "../../components/AIquestion";
import { getMessages, postMessage } from "../../apis/chat";
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const myId: number = Number(localStorage.getItem("userId"));
  if (!myId) {
    console.error("userId 없음");
  }
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectQuestion = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };
  const fetchMessages = async () => {
    try {
      const res = await getMessages();

      const newMessages: Message[] = res.map((m: any) => ({
        id: m.messageId,
        senderId: m.senderId,
        content: m.content,
        createdAt: m.createdAt ?? new Date().toISOString(),
        isMine: m.senderId === myId,
      }));

      setMessages((prev) => {
        const ids = new Set(prev.map((m) => m.id));
        const filtered = newMessages.filter((m) => !ids.has(m.id));
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (content: string) => {
    if (!content.trim()) return;

    try {
      await postMessage(content);
      setInputValue("");
      inputRef.current?.focus();
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <S.PageWrapper>
        <ChatHeader />
        <S.ContentArea>
          <S.ChatContainer>
            <SpeechBubbleList
              messages={messages}
              onDelete={(id) =>
                setMessages((prev) => prev.filter((m) => m.id !== Number(id)))
              }
            />
            <div ref={bottomRef} />
          </S.ChatContainer>

          <S.BottomArea>
            <S.AIArea>
              <AIquestion onSelectQuestion={handleSelectQuestion} />
            </S.AIArea>
            <Input
              ref={inputRef}
              value={inputValue}
              placeholder="이야기를 시작해 보세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              onSubmit={handleSubmit}
            />
          </S.BottomArea>
        </S.ContentArea>
      </S.PageWrapper>
    </>
  );
}
