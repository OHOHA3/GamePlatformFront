import axios from "axios";
import { UserConnectRoomRequest } from "./room.types";
import { createRequest } from "../createRequest";

/**
 * Функция для подключения пользователя к комнате.
 * @param {UserConnectRoomRequest} userConnect - Объект с параметрами комнаты и пользователя.
 * @returns {Promise<{ success: boolean }>} Результат подключения.
 * @throws Ошибка в случае неправильного кода комнаты или пользователя.
 */
export const joinRoom = async ({
  roomId,
  userId,
}: UserConnectRoomRequest): Promise<{ success: boolean }> => {
  try {
    const response = await createRequest().post<{ success: boolean }>(
      "/game-room-service/api/v1/user/connect",
      { roomId, userId }
    );
    return response.data; // Возвращаем результат подключения
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error("Неверный код комнаты или пользователь");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};
