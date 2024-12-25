export type GameListResponse = {
  id: number;
  name: string;
  version: string;
  description: string;
}[];

export type CreateGameRequest = {
  id: number;  
  roomId: number;
  settings?: Record<string, any>; 
};