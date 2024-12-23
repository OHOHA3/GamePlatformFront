export type GameListResponse = {
  id: number;
  name: string;
  version: string;
  description: string;
}[];

export type CreateGameRequest = {
  id: number;  // id игры
  roomId: number;
  settings?: Record<string, any>; // Если настройки не обязательны и могут быть различными
};