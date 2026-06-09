// frontend/src/components/layout/Hero.tsx
type HeroProps = {
  totalGames: number;
};

export function Hero({ totalGames }: HeroProps) {
  return (
    <section
      style={{
        width: "100%",
        padding: "1rem clamp(1rem, 4vw, 3rem) 0rem",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2.4rem, 5vw, 8.8rem)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.7,
          marginBottom: "1rem",
        }}
      >
        Curated PC game discounts
      </div>

      <h1
        style={{
          fontSize: "clamp(2.75rem, 7vw, 6rem)",
          lineHeight: 0.95,
          margin: 0,
          maxWidth: "1100px",
        }}
      >
        Track the best PC game deals in one editorial-style dashboard.
      </h1>

      <p
        style={{
          fontSize: "1.15rem",
          maxWidth: "820px",
          marginTop: "1.25rem",
          lineHeight: 1.6,
          opacity: 0.8,
        }}
      >
        Browse live Steam discounts, highlight the strongest value, and explore
        deals with a cleaner, magazine-like experience instead of a raw table.
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "999px",
            background: "#111",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          {totalGames} live deals
        </div>

        <a
          href="#deals"
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(0,0,0,0.12)",
            color: "inherit",
            textDecoration: "none",
            fontWeight: 600,
            background: "#fff",
          }}
        >
          Browse deals
        </a>
      </div>
    </section>
  );
}