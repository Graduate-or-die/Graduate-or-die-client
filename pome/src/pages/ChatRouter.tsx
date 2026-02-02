import ChatPage from "./ChatPage";
import MateInactivePage from "./MateInactivePage";
export default function ChatRouter() {
  const isMatched = false;
  return isMatched ? <ChatPage /> : <MateInactivePage variant="chat" />;
}
