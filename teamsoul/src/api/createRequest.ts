import axios, { AxiosInstance } from "axios";

export const createRequest = (): AxiosInstance => {
  return axios.create({
    baseURL: "http://194.226.49.153:8888",
    headers: {
      "Content-Type": "application/json",
    },
  });
};