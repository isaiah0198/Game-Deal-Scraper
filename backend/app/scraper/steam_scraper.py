from bs4 import BeautifulSoup
import httpx

def fetch_html(url: str) -> str:
    response = httpx.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=30)
    response.raise_for_status()
    return response.text

def parse_games(html: str) -> list[dict]:
    soup = BeautifulSoup(html, "lxml")
    games = []

    # find game cards here
    # loop through them
    # extract fields
    # append dicts

    return games

def main() -> None:
    url = "https://store.steampowered.com/search/?filter=topsellers"
    html = fetch_html(url)
    games = parse_games(html)
    
    for game in games[:10]:
        print(game)

if __name__ == "__main__":
    main()