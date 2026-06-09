// frontend/src/components/deals/GenreStrip.tsx
type GenreStripProps = {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
};

export function GenreStrip({
  genres,
  activeGenre,
  onGenreChange,
}: GenreStripProps) {
  return (
    <section
      style={{
        width: "100%",
        padding: "0 clamp(1rem, 4vw, 3rem) 2rem",
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
        Browse by genre
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          overflowX: "auto",
          paddingBottom: "0.25rem",
        }}
      >
        {genres.map((genre) => {
          const isActive = activeGenre === genre;

          return (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreChange(genre)}
              style={{
                whiteSpace: "nowrap",
                padding: "0.8rem 1rem",
                borderRadius: "999px",
                border: isActive
                  ? "1px solid #111"
                  : "1px solid rgba(0,0,0,0.12)",
                background: isActive ? "#111" : "#fff",
                color: isActive ? "#fff" : "#111",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </section>
  );
}