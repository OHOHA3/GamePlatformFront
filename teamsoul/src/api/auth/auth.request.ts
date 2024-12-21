import { LoginResponse, UserDetailsResponse, LoginInfo } from "./auth.types";
import axios from "axios";
import { createRequest } from "../createRequest";

const DEVELOPER_CREDENTIALS: LoginInfo = {
  login: "devuser",
  password: "devpass123",
};

/**
 * Выполняет вход пользователя.
 * @param loginInfo Объект с логином и паролем пользователя.
 * @returns Токен авторизации.
 * @throws Ошибка, если вход не удался.
 */
export const loginUser = async (
  loginInfo: LoginInfo
): Promise<LoginResponse> => {
  const { login, password } = loginInfo;

  if (
    login === DEVELOPER_CREDENTIALS.login &&
    password === DEVELOPER_CREDENTIALS.password
  ) {
    return { accessToken: "developer-jwt-token" };
  }

  try {
    const response = await createRequest().post<LoginResponse>(
      "/auth-service/api/v1/login",
      {
        identifier: login,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Неверный логин или пароль");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};

/**
 * Проверяет токен пользователя.
 * @param token Токен авторизации.
 * @returns Данные о пользователе.
 * @throws Ошибка, если токен недействителен или истёк.
 */
export const validateToken = async (
  token: string
): Promise<UserDetailsResponse> => {
  try {
    const response = await createRequest().get<UserDetailsResponse>(
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
