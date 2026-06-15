//src/components/deals/BestDealsRow.tsx
import { useRef } from "react";
import type { Game } from "../../types/game";
import { DealCard } from "./DealCard";

type BestDealsRowProps = {
  games: Game[];
};

export function BestDealsRow({ games }: BestDealsRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  function scrollByAmount(direction: "left" | "right"): void {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const cardWidth = 420;
    const gap = 16;
    const amount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  if (games.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        width: "100%",
        padding: "0 clamp(1rem, 4vw, 3rem) 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: "0.45rem",
            }}
          >
            Best deals
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "2rem",
            }}
          >
            Editor’s picks right now
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              margin: 0,
              opacity: 0.7,
              fontSize: "0.95rem",
            }}
          >
            Top discounts and strongest savings
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Scroll best deals left"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Scroll best deals right"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
        }}
      >
        <div
          ref={scrollContainerRef}
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(360px, 420px)",
            gap: "1rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
            scrollSnapType: "x proximity",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
          }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              style={{
                scrollSnapAlign: "start",
              }}
            >
              <DealCard game={game} />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "72px",
            pointerEvents: "none",
            background:
              "linear-gradient(to right, #f7f4ed 0%, rgba(247,244,237,0.92) 35%, rgba(247,244,237,0) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "72px",
            pointerEvents: "none",
            background:
              "linear-gradient(to left, #f7f4ed 0%, rgba(247,244,237,0.92) 35%, rgba(247,244,237,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}