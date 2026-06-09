# Game Deal Scraper

A full-stack game deal tracker that scrapes Steam sale data, stores it in SQLite, serves it through a FastAPI backend, and displays it in a React dashboard inspired by editorial-style browsing experiences.

## Overview

This project was built to learn and showcase:

- web scraping
- HTML parsing with BeautifulSoup
- data normalization
- SQLite + SQLAlchemy
- FastAPI API development
- React + TypeScript frontend development
- interactive filtering and deal discovery UI

The app fetches live Steam sale listings, extracts game pricing data, stores it locally, and presents it in a responsive dashboard with featured deals, a best-deals row, filters, and hover-driven deal cards.

## Features

- Scrapes live Steam sale/search results
- Extracts:
  - title
  - image
  - release date
  - discount percent
  - original price
  - final price
  - discount amount
  - product URL
- Stores data in SQLite
- Exposes data through FastAPI
- React frontend with:
  - search
  - price filters
  - discount filters
  - sorting
  - featured deal section
  - best deals row
  - editorial-style deal grid
- Hover-based card interactions
- Acquired-inspired browsing layout

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- httpx
- BeautifulSoup
- lxml

### Frontend
- React
- TypeScript
- Vite
- Axios

## Project Structure

```text
game-deal-scraper/
├─ backend/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ routes_games.py
│  │  ├─ db/
│  │  │  ├─ base.py
│  │  │  ├─ models.py
│  │  │  └─ session.py
│  │  ├─ schemas/
│  │  │  └─ game.py
│  │  ├─ scraper/
│  │  │  └─ steam_scraper.py
│  │  └─ main.py
│  ├─ games.db
│  ├─ requirements.txt
│  └─ sample_steam.html
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ types/
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  └─ package.json
└─ README.md

---

## How It Works

1. Scraping
The scraper fetches a Steam page and parses repeated game result rows using CSS selectors.
2. Data normalization
Raw strings like:
-75%
A$ 39.99
are converted into usable values like:
75
39.99
3. Storage
Parsed deals are inserted into SQLite and updated by product_url so reruns do not create duplicates.
4. API layer
FastAPI serves the stored deal data through JSON endpoints.
5. Frontend
React consumes the API and renders:
featured deal section
best deals row
searchable/filterable deal grid
hover-driven cards

---

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/your-username/game-deal-scraper.git
cd game-deal-scraper

2. Backend setup
```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

Run the scraper:
```
python -m app.scraper.steam_scraper

Start the API:
```
uvicorn app.main:app --reload

Backend runs at:
```text
http://127.0.0.1:8000

3. Frontend setup
```
cd frontend
npm install
npm run dev

Frontend runs at:
http://127.0.0.1:5173

API Endpoints
Health check
GET /health
Get all games
GET /games
Example filtered queries
GET /games?q=resident
GET /games?min_price=10&max_price=30
GET /games?min_discount=60
GET /games?sort=price_asc
Interactive API docs
http://127.0.0.1:8000/docs

## Database Schema

games

| Column           | Type    |
| ---------------- | ------- |
| id               | Integer |
| title            | String  |
| release_date     | String  |
| image_url        | String  |
| discount_percent | Integer |
| original_price   | Float   |
| final_price      | Float   |
| discount_amount  | Float   |
| product_url      | String  |

Example Record
```JSON
{
  "title": "Resident Evil 4",
  "release_date": "24 Jan, 2019",
  "image_url": "https://...",
  "discount_percent": 75,
  "original_price": 59.95,
  "final_price": 14.98,
  "discount_amount": 44.97,
  "product_url": "https://store.steampowered.com/app/2050650/Resident_Evil_4/"
}

### What I Learned Building This

This project was built to practice:
inspecting HTML and identifying repeatable selectors
writing a scraper against real page structure
cleaning messy scraped text into typed values
storing scraped data in a relational database
exposing data through a backend API
building a React frontend on top of a Python backend
designing a more polished, portfolio-quality UI

## Roadmap

 Scrape Steam deal listings
 Normalize pricing and discounts
 Save deals to SQLite
 Build FastAPI backend
 Build React dashboard
 Add filtering and sorting
 Add featured deal and best-deals row
 Scrape real genres/tags
 Add genre-based backend filtering
 Add scheduled scraping
 Add tests
 Add deployment
 Add price history



## Notes

This project is for educational and portfolio purposes.
Steam page structure may change over time, which may require selector updates.
Always review scraping rules and terms before expanding or deploying a scraper.
---
### License

MIT
---
## Author

Built by Isaiah Lane