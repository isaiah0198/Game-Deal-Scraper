// frontend/src/components/layout/Navbar.tsx
type NavbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function Navbar({ search, onSearchChange }: NavbarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(247, 244, 237, 0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "1rem clamp(1rem, 3vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Game Deal Scraper
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Deal Journal
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "1rem",
            fontSize: "0.95rem",
            opacity: 0.8,
          }}
        >
          <a href="#featured" style={{ color: "inherit", textDecoration: "none" }}>
            Featured
          </a>
          <a href="#deals" style={{ color: "inherit", textDecoration: "none" }}>
            Deals
          </a>
          <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>
            About
          </a>
        </nav>

        <input
          type="text"
          placeholder="Search games"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            minWidth: "280px",
            width: "min(420px, 100%)",
            padding: "0.85rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#fff",
            outline: "none",
          }}
        />
      </div>
    </header>
  );
}