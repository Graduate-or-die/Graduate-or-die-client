import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

export const jsonAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const formDataAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
