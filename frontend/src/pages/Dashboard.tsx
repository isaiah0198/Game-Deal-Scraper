import { useEffect, useState } from "react";
import { fetchGames } from "../api/games";
import type { Game } from "../types/game";

export default function Dashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        setError("Failed to load games.");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  if (loading) {
    return <p>Loading games...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Game Deal Dashboard</h1>
      <p>Found {games.length} games</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {games.map((game) => (
          <article
            key={game.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            {game.image_url && (
              <img
                src={game.image_url}
                alt={game.title ?? "Game image"}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}

            <h2 style={{ fontSize: "1.1rem", marginTop: "0.75rem" }}>
              {game.title ?? "Untitled"}
            </h2>

            <p>Release date: {game.release_date ?? "Unknown"}</p>
            <p>Discount: {game.discount_percent ?? 0}%</p>
            <p>Original price: {game.original_price ?? "N/A"}</p>
            <p>Final price: {game.final_price ?? "N/A"}</p>
            <p>You save: {game.discount_amount ?? "N/A"}</p>

            {game.product_url && (
              <a href={game.product_url} target="_blank" rel="noreferrer">
                View on Steam
              </a>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}