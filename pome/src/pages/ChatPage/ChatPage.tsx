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
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLengthRef = useRef(0);

  const myId: number = Number(localStorage.getItem("userId"));
  if (!myId) {
    console.error("userId 없음");
  }

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const isNearBottom = () => {
    const el = chatRef.current;
    if (!el) return false;

    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
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
    const init = async () => {
      await fetchMessages();
      scrollToBottom(false);
    };
    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messages.length > prevLengthRef.current && isNearBottom()) {
      scrollToBottom();
    }
    prevLengthRef.current = messages.length;
  }, [messages]);

  const handleSubmit = async (content: string) => {
    if (!content.trim()) return;

    try {
      await postMessage(content);
      setInputValue("");
      inputRef.current?.focus();

      await fetchMessages();
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectQuestion = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  return (
    <S.PageWrapper>
      <ChatHeader />

      <S.ContentArea>
        <S.ChatContainer ref={chatRef}>
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
  );
}
