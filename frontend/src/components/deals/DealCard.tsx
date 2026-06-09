// frontend/src/components/deals/DealCard.tsx
import { useState } from "react";
import type { Game } from "../../types/game";

type DealCardProps = {
  game: Game;
};

function formatPrice(value: number | null): string {
  if (value === null) {
    return "N/A";
  }

  return `$${value.toFixed(2)}`;
}

export function DealCard({ game }: DealCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#d9d9d9",
        aspectRatio: "231 / 87",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: isHovered
          ? "0 14px 32px rgba(0,0,0,0.14)"
          : "0 8px 22px rgba(0,0,0,0.06)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
    >
      {game.image_url ? (
        <img
          src={game.image_url}
          alt={game.title ?? "Game image"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: isHovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 220ms ease",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #e8e4dc, #d7d1c7)",
            color: "#222",
            fontSize: "1rem",
            fontWeight: 700,
            padding: "1rem",
            textAlign: "center",
          }}
        >
          {game.title ?? "Untitled"}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "0.35rem 0.6rem",
          borderRadius: "999px",
          background: "#1f9d55",
          color: "#fff",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.01em",
          boxShadow: "0 8px 20px rgba(31,157,85,0.28)",
          zIndex: 2,
        }}
      >
        {game.discount_percent ?? 0}% off
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          padding: "0.9rem",
          background: isHovered
            ? "linear-gradient(to top, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.56) 45%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 35%, rgba(0,0,0,0) 100%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 180ms ease, background 180ms ease",
        }}
      >
        <div
          style={{
            width: "100%",
            color: "#fff",
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 180ms ease",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1rem",
              lineHeight: 1.1,
            }}
          >
            {game.title ?? "Untitled"}
          </h3>

          <p
            style={{
              margin: "0.45rem 0 0",
              opacity: 0.85,
              fontSize: "0.82rem",
            }}
          >
            Released: {game.release_date ?? "Unknown"}
          </p>

          <div
            style={{
              marginTop: "0.55rem",
              display: "grid",
              gap: "0.12rem",
              fontSize: "0.82rem",
            }}
          >
            <span>Now: {formatPrice(game.final_price)}</span>
            <span style={{ opacity: 0.8 }}>
              Was: {formatPrice(game.original_price)}
            </span>
            <span style={{ fontWeight: 700 }}>
              Save: {formatPrice(game.discount_amount)}
            </span>
          </div>

          {game.product_url && (
            <a
              href={game.product_url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.6rem",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              Open deal →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}