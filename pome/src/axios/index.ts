import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

export const jsonAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const formDataAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

jsonAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

formDataAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
