import axios, { AxiosInstance, AxiosError } from "axios";
import API_BASE_URL from "./config";

// Определяем интерфейсы для запросов и ответов
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

// Создаем экземпляр axios с базовой конфигурацией
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Функция для авторизации пользователя
export const loginUser = async (
  login: string,
  password: string
): Promise<AuthenticationResponse> => {
  // Жестко закодированные креды для разработчика
  const developerCredentials = {
    username: "devuser",
    password: "devpass123",
  };

  // Если логин и пароль совпадают с данными для разработчика
  if (
    login === developerCredentials.username &&
    password === developerCredentials.password
  ) {
    // Возвращаем фальшивой токен для разработчика
    return { token: "developer-jwt-token" }; // Вы можете заменить на нужный токен
  }
  let identifier = login;
  try {
    // Обычный запрос для аутентификации
    const response = await api.post<AuthenticationResponse>(
      "/auth-service/api/v1/login",
      {
        identifier,
        password,
      }
    );
    return response.data; // Возвращаем данные токена
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        throw new Error("Неверный логин или пароль");
      }
    }
    throw new Error("Произошла ошибка на сервере");
  }
};
// Функция для проверки токена
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
    return response.data; // Возвращаем информацию о пользователе
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Токен недействителен или истёк");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};
