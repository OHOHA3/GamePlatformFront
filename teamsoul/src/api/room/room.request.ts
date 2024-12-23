import axios from "axios";
import { UserConnectRoomRequest } from "./room.types";
import { createRequest } from "../createRequest";

/**
 * Функция для подключения пользователя к комнате.
 * @param {UserConnectRoomRequest} userConnect - Объект с параметрами комнаты и пользователя.
 * @returns {Promise<{ success: boolean }>} Результат подключения.
 * @throws Ошибка в случае неправильного кода комнаты или пользователя.
 */
export const createGame = async (
  token: string,
  id: number,
  roomId: number
): Promise<{ gameUrl: string }> => {
  try {
    const response = await createRequest().post<{ gameUrl: string }>(
      "/game-room-service/api/v1/game/create",
      { id, roomId }, // Отправляем id и roomId в теле запроса
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Неверный токен авторизации или ошибка создания игры");
      } else {
        throw new Error(`Произошла ошибка на сервере: ${error.message}`);
      }
    } else {
      throw new Error("Произошла ошибка при отправке запроса");
    }
  }
};


export const createRoom = async (

): Promise<{ roomId: number }> => {
  try {
    const response = await createRequest().get<{ roomId: number }>(
      "/game-room-service/api/v1/room/create",
      {
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error("Неверный токен авторизации или ошибка создания игры");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};






export const joinRoom = async ({
  roomId,
  authorizationToken,
}: {
  roomId: string;
  authorizationToken: string;
}): Promise<{ gameUrl: string }> => {
  try {
    const response = await createRequest().post<{ gameUrl: string }>(
      "/game-room-service/api/v1/user/connect",
      { roomId },
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    return response.data;
    // Ничего не возвращаем в случае успеха
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(
          "Неверный токен авторизации или ошибка подключения к комнате"
        );
      } else {
        throw new Error(`Произошла ошибка на сервере: ${error.message}`);
      }
    } else {
      throw new Error("Произошла ошибка при отправке запроса");
    }
  }
};