import RecommendPage from "./RecommendPage";
import MateHomePage from "./MateHomePage";
import MateInactivePage from "./MateInactivePage";
export default function MateRouter() {
  const isMateEnabled = true;
  const isMatched = true;
  if (!isMateEnabled) {
    return <MateInactivePage variant="mate" />;
  }
  return isMatched ? <MateHomePage /> : <RecommendPage />;
}
