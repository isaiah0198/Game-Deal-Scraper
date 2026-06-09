// frontend/src/components/deals/FeaturedDeal.tsx
import type { Game } from "../../types/game";

type FeaturedDealProps = {
  game: Game | null;
};

export function FeaturedDeal({ game }: FeaturedDealProps) {
  if (!game) {
    return null;
  }

  return (
    <section
      id="featured"
      style={{
        width: "100%",
        padding: "1rem clamp(1rem, 4vw, 3rem) 2rem",
      }}
    >
      <div
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.7,
          marginBottom: "0.75rem",
        }}
      >
        Featured deal
      </div>

      <article
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          background: "#111",
          color: "#fff",
          borderRadius: "28px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div style={{ minHeight: "420px", background: "#1a1a1a" }}>
          {game.image_url && (
            <img
              src={game.image_url}
              alt={game.title ?? "Featured game"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          )}
        </div>

        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.45rem 0.7rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              fontSize: "0.9rem",
              fontWeight: 700,
            }}
          >
            {game.discount_percent ?? 0}% off
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.02,
              margin: 0,
            }}
          >
            {game.title ?? "Untitled"}
          </h2>

          <p style={{ opacity: 0.8, lineHeight: 1.6, marginTop: "1rem" }}>
            A standout discount right now based on savings and price drop. Great
            candidate for your spotlight section.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              marginTop: "1.25rem",
              fontSize: "1rem",
            }}
          >
            <span>Now: ${game.final_price ?? "N/A"}</span>
            <span>Was: ${game.original_price ?? "N/A"}</span>
            <span>Save: ${game.discount_amount ?? "N/A"}</span>
          </div>

          {game.product_url && (
            <a
              href={game.product_url}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "1.5rem",
                alignSelf: "flex-start",
                padding: "0.9rem 1.1rem",
                borderRadius: "999px",
                background: "#fff",
                color: "#111",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View on Steam
            </a>
          )}
        </div>
      </article>
    </section>
  );
}