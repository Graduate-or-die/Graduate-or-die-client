import { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import MateInactivePage from "./MateInactivePage";
import { getMyPage } from "../apis/user";
import { getMateExists } from "../apis/mate";

export default function ChatRouter() {
  const [matching, setMatching] = useState<boolean | null>(null);
  const [isMatched, setIsMatched] = useState<boolean | null>(null);

  const fetchData = async () => {
    try {
      const myPage = await getMyPage();
      setMatching(myPage.matching);

      if (myPage.matching) {
        const mate = await getMateExists();
        setIsMatched(mate);
      } else {
        setIsMatched(false);
      }
    } catch (e) {
      console.error(e);
      setIsMatched(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (matching === null || isMatched === null) {
    return <div>로딩 중...</div>;
  }
  if (!matching) {
    return <MateInactivePage variant="chat" />;
  }
  if (!isMatched) {
    return <MateInactivePage variant="noMate" />;
  }
  return <ChatPage />;
}
