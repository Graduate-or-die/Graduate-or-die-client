import React, { useState, useRef } from "react";
import * as S from "./SpeechBubbles.style";
import { Message } from "../../types/message";
import { Etc } from "../../icons";
import { ChatProfile } from "../../assets";
type MessageBubbleProps = {
  message: Message;
  isContinuous: boolean;
  onOpenPop: (pos: { x: number; y: number }) => void;
  isSelected:boolean;
};
const LONG_PRESS_MS = 500;

export default function SpeechBubbles({
  message,
  isContinuous,
  isSelected,
  onOpenPop,
}: MessageBubbleProps) {
  const { isMine, content, id } = message;
  const timerRef = useRef<number | null>(null);

  const openByEvent = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    let x = 0;
    let y = 0;

    if ("touches" in e) {
      const touch = e.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    onOpenPop({ x, y });
  };
  const handleLongPressStart = (e: React.TouchEvent) => {
    timerRef.current = window.setTimeout(() => {
      openByEvent(e);
    }, LONG_PRESS_MS);
  };

  const handleLongPressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  return (
    <>
      <S.Wrapper $isMine={isMine}>
        {isMine && (
          <>
            <S.Bubble
              $isMine={isMine}
              $selcted={isSelected}
              onContextMenu={openByEvent}
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
              onTouchMove={handleLongPressEnd}
            >
              <S.Contents $isMine={isMine}>{content}</S.Contents>
            </S.Bubble>
          </>
        )}

        {!isMine && (
          <>
            <S.ProfileBox>
              <ChatProfile
                style={{ visibility: isContinuous ? "hidden" : "visible" }}
              />
            </S.ProfileBox>

            <S.Bubble
              $isMine={isMine}
              $selcted={isSelected}
              onContextMenu={openByEvent}
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
              onTouchMove={handleLongPressEnd}
            >
              <S.Contents $isMine={isMine}>{content}</S.Contents>
            </S.Bubble>
          </>
        )}
      </S.Wrapper>
    </>
  );
}
