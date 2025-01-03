import axios from "axios";
import { UserConnectRoomRequest } from "./room.types";
import { createRequest } from "../createRequest";

interface JoinRoomResponse {
  url: string;
}
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
): Promise<JoinRoomResponse> => {
  try {
    const response = await createRequest().post<JoinRoomResponse>(
      "/game-room-service/api/v1/game/create",
      { id, roomId },
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
}): Promise<JoinRoomResponse> => {
  try {
    const response = await createRequest().post<JoinRoomResponse>(
      "/game-room-service/api/v1/user/connect",
      { roomId },
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    return response.data;
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