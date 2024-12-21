import axios, { AxiosInstance } from "axios";

export const createRequest = (): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};