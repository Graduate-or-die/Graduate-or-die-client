import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jsonAxios } from "../../axios";
export default function KakaoCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return navigate("/");

    jsonAxios
      .post("/auth/login", { code })
      .then((res) => {
        const accessToken = res.data.result.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert("카카오 로그인 실패");
        navigate("/");
      });
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}
