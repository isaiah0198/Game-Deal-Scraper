//src/types/game.ts
export type Game = {
  id: number;
  title: string | null;
  release_date: string | null;
  image_url: string | null;
  discount_percent: number | null;
  original_price: number | null;
  final_price: number | null;
  discount_amount: number | null;
  product_url: string | null;
};