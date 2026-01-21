import { useState } from "react";
import { Message } from "../../types/message";
import SpeechBubbles from "../SpeechBubbles";
import ChatDeletePop from "../ChatDeletePop";
type Props = {
  messages: Message[];
  onDelete: (id: string) => void;
};

export default function SpeechBubbleList({ messages, onDelete }: Props) {
  const [popState, setPopState] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <>
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1];
        const isContinuous =
          prevMessage && prevMessage.senderId === message.senderId;

        return (
          <SpeechBubbles
            key={message.id}
            message={message}
            isContinuous={!!isContinuous}
            isSelected={popState?.id === message.id}
            onOpenPop={(pos) => setPopState({ id: message.id, ...pos })}
          />
        );
      })}
      {popState && (
        <ChatDeletePop
          x={popState.x}
          y={popState.y}
          onClose={() => setPopState(null)}
          onDelete={() => {
            onDelete(popState.id);
            setPopState(null);
          }}
        />
      )}
    </>
  );
}
