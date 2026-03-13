import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jsonAxios } from "../../axios";
export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return navigate("/");

    jsonAxios
      .post("/auth/login", { code })
      .then((res) => {
        const { accessToken, userId } = res.data.result;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", String(userId));
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert("카카오 로그인 실패");
        navigate("/");
      });
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
