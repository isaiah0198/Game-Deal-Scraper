# backend/app/scraper/steam_scraper.py

from __future__ import annotations

from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup
import httpx
from sqlalchemy import select

from app.db.base import Base
from app.db.models import Game
from app.db.session import SessionLocal, engine


STEAM_SEARCH_URL = "https://store.steampowered.com/search/?specials=1"
SAMPLE_HTML_PATH = Path("sample_steam.html")


def fetch_html(url: str) -> str:
    response = httpx.get(
        url,
        headers={"User-Agent": "Mozilla/5.0"},
        timeout=30,
    )
    response.raise_for_status()
    return response.text


def save_html(html: str, path: Path) -> None:
    path.write_text(html, encoding="utf-8")


def load_html(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def get_text_or_none(element: Any) -> str | None:
    if element is None:
        return None
    text = element.get_text(strip=True)
    return text or None


def parse_price(text: str | None) -> float | None:
    if not text:
        return None

    cleaned = text.strip()
    cleaned = cleaned.replace("A$", "")
    cleaned = cleaned.replace("$", "")
    cleaned = cleaned.replace(",", "")
    cleaned = cleaned.strip()

    if cleaned.lower() == "free":
        return 0.0

    if not cleaned:
        return None

    try:
        return float(cleaned)
    except ValueError:
        return None


def parse_discount(text: str | None) -> int | None:
    if not text:
        return None

    cleaned = text.strip()
    cleaned = cleaned.replace("-", "")
    cleaned = cleaned.replace("%", "")
    cleaned = cleaned.strip()

    if not cleaned:
        return None

    try:
        return int(cleaned)
    except ValueError:
        return None


def parse_games(html: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "lxml")
    game_rows = soup.select("a.search_result_row")
    games: list[dict[str, Any]] = []

    print(f"Found {len(game_rows)} matching game rows in the HTML.")

    for row in game_rows:
        title = get_text_or_none(row.select_one(".title"))

        image_tag = row.select_one(".search_capsule img")
        image_url = image_tag["src"] if image_tag and "src" in image_tag.attrs else None

        release_date = get_text_or_none(row.select_one(".search_released"))

        raw_discount_percent = get_text_or_none(row.select_one(".discount_pct"))
        raw_original_price = get_text_or_none(row.select_one(".discount_original_price"))
        raw_final_price = get_text_or_none(row.select_one(".discount_final_price"))

        discount_percent = parse_discount(raw_discount_percent)
        original_price = parse_price(raw_original_price)
        final_price = parse_price(raw_final_price)

        if final_price is None and original_price is not None:
            final_price = original_price

        discount_amount = None
        if original_price is not None and final_price is not None:
            discount_amount = round(original_price - final_price, 2)

        product_url = row.get("href")

        game = {
            "title": title,
            "release_date": release_date,
            "image_url": image_url,
            "discount_percent": discount_percent,
            "original_price": original_price,
            "final_price": final_price,
            "discount_amount": discount_amount,
            "product_url": product_url,
        }

        games.append(game)

    return games


def init_db() -> None:
    Base.metadata.create_all(bind=engine)


def save_games(games: list[dict[str, Any]]) -> None:
    with SessionLocal() as session:
        for game_data in games:
            existing_game = session.execute(
                select(Game).where(Game.product_url == game_data["product_url"])
            ).scalar_one_or_none()

            if existing_game:
                existing_game.title = game_data["title"]
                existing_game.release_date = game_data["release_date"]
                existing_game.image_url = game_data["image_url"]
                existing_game.discount_percent = game_data["discount_percent"]
                existing_game.original_price = game_data["original_price"]
                existing_game.final_price = game_data["final_price"]
                existing_game.discount_amount = game_data["discount_amount"]
            else:
                game = Game(
                    title=game_data["title"],
                    release_date=game_data["release_date"],
                    image_url=game_data["image_url"],
                    discount_percent=game_data["discount_percent"],
                    original_price=game_data["original_price"],
                    final_price=game_data["final_price"],
                    discount_amount=game_data["discount_amount"],
                    product_url=game_data["product_url"],
                )
                session.add(game)

        session.commit()


def print_saved_games() -> None:
    with SessionLocal() as session:
        games = session.execute(select(Game)).scalars().all()

        print(f"Saved {len(games)} games in database:")

        for game in games[:10]:
            print(
                {
                    "id": game.id,
                    "title": game.title,
                    "final_price": game.final_price,
                    "discount_percent": game.discount_percent,
                    "product_url": game.product_url,
                }
            )


def main() -> None:
    init_db()

    html = fetch_html(STEAM_SEARCH_URL)
    print(f"Downloaded HTML length: {len(html)}")

    save_html(html, SAMPLE_HTML_PATH)

    parsed_html = load_html(SAMPLE_HTML_PATH)
    games = parse_games(parsed_html)

    print(f"Parsed {len(games)} games:")

    save_games(games)
    print_saved_games()


if __name__ == "__main__":
    main()