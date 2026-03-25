import { jsonAxios } from "../axios";
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = "http://43.203.188.196/auth/login";
export const getLogin = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};
