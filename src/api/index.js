// hooks
import axios from "axios";
import { BASE_URL_SERVER } from "../config";

export const api = axios.create({
  baseURL: BASE_URL_SERVER,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
