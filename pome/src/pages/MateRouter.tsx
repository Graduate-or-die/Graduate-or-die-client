import RecommendPage from "./RecommendPage";
import MateHomePage from "./MateHomePage";

export default function MateRouter() {
  const isMatched = false; // 개발을 위한 임시 코드

  return isMatched ? <MateHomePage /> : <RecommendPage />;
}
