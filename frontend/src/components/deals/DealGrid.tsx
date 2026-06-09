// frontend/src/components/deals/DealGrid.tsx
import type { Game } from "../../types/game";
import { DealCard } from "./DealCard";

type DealGridProps = {
  games: Game[];
  loading: boolean;
  error: string | null;
  minPrice: string;
  maxPrice: string;
  minDiscount: string;
  sort: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onMinDiscountChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function DealGrid({
  games,
  loading,
  error,
  minPrice,
  maxPrice,
  minDiscount,
  sort,
  onMinPriceChange,
  onMaxPriceChange,
  onMinDiscountChange,
  onSortChange,
}: DealGridProps) {
  return (
    <section
      id="deals"
      style={{
        width: "100%",
        padding: "1rem clamp(1rem, 4vw, 3rem) 4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: "0.5rem",
            }}
          >
            Browse deals
          </div>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>All current discounts</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0.75rem",
            width: "min(900px, 100%)",
          }}
        >
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          />

          <input
            type="number"
            placeholder="Min discount %"
            value={minDiscount}
            onChange={(e) => onMinDiscountChange(e.target.value)}
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          />

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <option value="discount_desc">Discount: High to Low</option>
            <option value="discount_asc">Discount: Low to High</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading games...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <p style={{ marginBottom: "1.25rem", opacity: 0.75 }}>
          Found {games.length} games
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1rem",
        }}
      >
        {games.map((game) => (
          <DealCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}