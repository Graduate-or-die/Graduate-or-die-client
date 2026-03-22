import { useEffect, useState } from "react";

import RecommendPage from "./RecommendPage";
import MateHomePage from "./MateHomePage";
import MateInactivePage from "./MateInactivePage";

import { getMyPage } from "../apis/user";
import { getMateExists } from "../apis/mate";

export default function MateRouter() {
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
    } catch (error) {
      console.error("데이터 조회 실패", error);
      setMatching(false);
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
    return <MateInactivePage variant="mate" />;
  }

  if (isMatched) {
    return <MateHomePage />;
  }

  return <RecommendPage />;
}
