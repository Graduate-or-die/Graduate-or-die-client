import RecommendPage from "./RecommendPage";
import MateHomePage from "./MateHomePage";
import MateInactivePage from "./MateInactivePage";
export default function MateRouter() {
  const isMateEnabled = false;
  const isMatched = false;
  if (!isMateEnabled) {
    return <MateInactivePage variant="mate" />;
  }
  return isMatched ? <MateHomePage /> : <RecommendPage />;
}
