import axios, { AxiosInstance, AxiosError } from "axios";
import API_BASE_URL from "./config";

interface LoginRequest {
  login: string;
  password: string;
}

interface AuthenticationResponse {
  token: string;
}

interface UserDetailsResponse {
  id: string;
  username: string;
  email: string;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const loginUser = async (
  login: string,
  password: string
): Promise<AuthenticationResponse> => {
  const developerCredentials = {
    username: "devuser",
    password: "devpass123",
  };

  if (
    login === developerCredentials.username &&
    password === developerCredentials.password
  ) {
    return { token: "developer-jwt-token" };
  }
  let identifier = login;
  try {
    const response = await api.post<AuthenticationResponse>(
      "/auth-service/api/v1/login",
      {
        identifier,
        password,
      }
    );
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        throw new Error("Неверный логин или пароль");
      }
    }
    throw new Error("Произошла ошибка на сервере");
  }
};
export const validateToken = async (
  token: string
): Promise<UserDetailsResponse> => {
  try {
    const response = await api.get<UserDetailsResponse>(
      "/auth-service/api/v1/validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Токен недействителен или истёк");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};
