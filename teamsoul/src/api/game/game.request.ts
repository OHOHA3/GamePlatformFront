import { createRequest } from "../createRequest";
import { CreateGameRequest, GameListResponse } from "./game.types";
import axios from "axios";

export const getGamesList = async (): Promise<GameListResponse> => {
  try {
    const response = await createRequest().get<GameListResponse>(
      "/game-plugins-service/api/v1/games"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Список игр не найден");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};



export const createGameInstance = async (
  token: string,
  requestBody: CreateGameRequest
): Promise<string> => {
  try {
    const response = await axios.post<string>(
      "/game-plugins-service/api/v1/games/create",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data || "Ошибка в запросе клиента");
    }
    throw new Error("Произошла ошибка на сервере");
  }
};