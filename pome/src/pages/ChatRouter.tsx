import ChatPage from "./ChatPage";
import MateInactivePage from "./MateInactivePage";
export default function ChatRouter() {
  const isMatched = true;
  return isMatched ? <ChatPage /> : <MateInactivePage variant="chat" />;
}
