import axios from "axios";
import type { Game } from "../types/game";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export type GameFilters = {
  q?: string;
  min_price?: number;
  max_price?: number;
  min_discount?: number;
  sort?: string;
};

export async function fetchGames(filters: GameFilters = {}): Promise<Game[]> {
  const response = await api.get<Game[]>("/games", {
    params: filters,
  });
  return response.data;
}