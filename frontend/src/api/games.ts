import axios from "axios";
import type { Game } from "../types/game";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function fetchGames(): Promise<Game[]> {
  const response = await api.get<Game[]>("/games");
  return response.data;
}