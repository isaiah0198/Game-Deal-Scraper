import { useEffect, useMemo, useState } from "react";
import { fetchGames } from "../api/games";
import type { Game } from "../types/game";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/layout/Hero";
import { FeaturedDeal } from "../components/deals/FeaturedDeal";
import { GenreStrip } from "../components/deals/GenreStrip";
import { BestDealsRow } from "../components/deals/BestDealsRow";
import { DealGrid } from "../components/deals/DealGrid";

const GENRES = [
  "All",
  "Action",
  "RPG",
  "Strategy",
  "Horror",
  "Adventure",
  "Indie",
  "Simulation",
];

export default function Dashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [sort, setSort] = useState("discount_desc");
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchGames({
          q: search || undefined,
          min_price: minPrice ? Number(minPrice) : undefined,
          max_price: maxPrice ? Number(maxPrice) : undefined,
          min_discount: minDiscount ? Number(minDiscount) : undefined,
          sort,
        });

        setGames(data);
      } catch {
        setError("Failed to load games.");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, [search, minPrice, maxPrice, minDiscount, sort]);

  const genreFilteredGames = useMemo(() => {
    if (activeGenre === "All") {
      return games;
    }

    return games.filter((game) => {
      const title = game.title?.toLowerCase() ?? "";

      if (activeGenre === "Horror") return /resident evil|backrooms|forest/.test(title);
      if (activeGenre === "RPG") return /path of exile|witcher|palworld|kingdom come/.test(title);
      if (activeGenre === "Strategy") return /age of empires|civilization|timberborn/.test(title);
      if (activeGenre === "Action") return /monster hunter|street fighter|returnal|cuphead/.test(title);
      if (activeGenre === "Adventure") return /sea of stars|grounded|planet crafter/.test(title);
      if (activeGenre === "Indie") return /vampire survivors|cuphead|voidling/.test(title);
      if (activeGenre === "Simulation") return /flight simulator|forza|planet crafter/.test(title);

      return true;
    });
  }, [games, activeGenre]);

  const featuredDeal = useMemo(() => {
    if (genreFilteredGames.length === 0) {
      return null;
    }

    return [...genreFilteredGames].sort((a, b) => {
      const aScore = a.discount_amount ?? 0;
      const bScore = b.discount_amount ?? 0;
      return bScore - aScore;
    })[0];
  }, [genreFilteredGames]);

  const bestDeals = useMemo(() => {
    return [...genreFilteredGames]
      .sort((a, b) => {
        const aDiscount = a.discount_percent ?? 0;
        const bDiscount = b.discount_percent ?? 0;

        if (bDiscount !== aDiscount) {
          return bDiscount - aDiscount;
        }

        const aSavings = a.discount_amount ?? 0;
        const bSavings = b.discount_amount ?? 0;
        return bSavings - aSavings;
      })
      .slice(0, 8);
  }, [genreFilteredGames]);

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f7f4ed",
        color: "#111",
      }}
    >
      <Navbar search={search} onSearchChange={setSearch} />
      <Hero totalGames={genreFilteredGames.length} />
      <GenreStrip
        genres={GENRES}
        activeGenre={activeGenre}
        onGenreChange={setActiveGenre}
      />
      <FeaturedDeal game={featuredDeal} />
      <BestDealsRow games={bestDeals} />
      <DealGrid
        games={genreFilteredGames}
        loading={loading}
        error={error}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minDiscount={minDiscount}
        sort={sort}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onMinDiscountChange={setMinDiscount}
        onSortChange={setSort}
      />

      <footer
        id="about"
        style={{
          width: "100%",
          padding: "0 clamp(1rem, 4vw, 3rem) 3rem",
          opacity: 0.7,
        }}
      >
        Built as a full-stack scraping project with React, FastAPI, SQLite, and
        Steam price data.
      </footer>
    </main>
  );
}