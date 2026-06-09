Yes — here is a clean, proper `README.md` you can copy and paste directly into your repo root.

````md
# Game Deal Scraper

A full-stack game deals tracker that scrapes Steam sale listings, stores them in SQLite, serves them through a FastAPI backend, and displays them in a React dashboard with an editorial-style UI inspired by content-first browsing experiences.

---

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

---

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
- Stores deals in SQLite
- Exposes data through FastAPI
- React frontend with:
  - search
  - price filters
  - discount filters
  - sorting
  - featured deal section
  - best deals row
  - editorial-style deal grid
  - hover-based card interactions
- Acquired-inspired browsing layout

---

## Inspiration

The UI direction is inspired by editorial/content-driven browsing experiences like **Acquired.fm**, adapted for game discovery and deal tracking.

This project is not a clone. It uses a similar content-first browsing feel for:

- featured content
- curated rows
- hover-driven discovery
- clean typography and spacing

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- httpx
- BeautifulSoup
- lxml

---

## Project Structure

```text
game-deal-scraper/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes_games.py
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   ├── models.py
│   │   │   └── session.py
│   │   ├── schemas/
│   │   │   └── game.py
│   │   ├── scraper/
│   │   │   └── steam_scraper.py
│   │   └── main.py
│   ├── games.db
│   ├── requirements.txt
│   └── sample_steam.html
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
````

---

## How It Works

### 1. Scraping

The scraper fetches a Steam page and parses repeated game result rows using CSS selectors.

### 2. Data normalization

Raw strings like:

* `-75%`
* `A$ 39.99`

are converted into usable values like:

* `75`
* `39.99`

### 3. Storage

Parsed deals are inserted into SQLite and updated by `product_url` so reruns do not create duplicates.

### 4. API layer

FastAPI serves the stored deal data through JSON endpoints.

### 5. Frontend

React consumes the API and renders:

* featured deal section
* best deals row
* searchable/filterable deal grid
* hover-driven cards

---

## Demo

### Current features

* Scrapes live Steam sale/search pages
* Extracts game title, image, release date, prices, discount percent, and Steam URL
* Stores data in SQLite
* Serves data through FastAPI
* Displays data in a React + TypeScript dashboard
* Supports search, price filters, discount filters, sorting, featured deal sections, and best-deals browsing

### Planned additions

* Real genre/tag scraping
* Genre strip backed by actual scraped data
* Price history
* Scheduled scraping
* Deployment
* Tests

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/game-deal-scraper.git
cd game-deal-scraper
```

---

## Backend Setup

### 1. Go into the backend folder

```bash
cd backend
```

### 2. Create and activate a virtual environment

#### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### Windows PowerShell

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the scraper

```bash
python -m app.scraper.steam_scraper
```

This will:

* fetch Steam HTML
* parse the data
* create `games.db`
* insert or update rows in the `games` table

### 5. Start the API

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

### 1. Go into the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

Frontend usually runs at:

```text
http://127.0.0.1:5173
```

---

## API Endpoints

### Health check

```http
GET /health
```

### Get all games

```http
GET /games
```

### Example filtered queries

```http
GET /games?q=resident
GET /games?min_price=10&max_price=30
GET /games?min_discount=60
GET /games?sort=price_asc
```

### Interactive API docs

```text
http://127.0.0.1:8000/docs
```

---

## Database Schema

### `games`

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

---

## Example Record

```json
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
```

---

## Current UI Direction

The frontend is being designed to feel more like an editorial media site than a plain data dashboard.

Current UI ideas include:

* large hero section
* featured deal spotlight
* best deals horizontal row
* hover-reveal deal cards
* genre strip
* wide Steam-style capsule cards
* responsive full-width layout

---

## Screenshots

Add screenshots here once the UI is polished.

```md
![Homepage](./screenshots/homepage.png)
![Deals Grid](./screenshots/deals-grid.png)
![Featured Deal](./screenshots/featured-deal.png)
```

---

## What I Learned Building This

This project was built to practice:

* inspecting HTML and identifying repeatable selectors
* writing a scraper against real page structure
* cleaning messy scraped text into typed values
* storing scraped data in a relational database
* exposing data through a backend API
* building a React frontend on top of a Python backend
* designing a more polished, portfolio-quality UI

---

## Roadmap

* [x] Scrape Steam deal listings
* [x] Normalize pricing and discounts
* [x] Save deals to SQLite
* [x] Build FastAPI backend
* [x] Build React dashboard
* [x] Add filtering and sorting
* [x] Add featured deal and best-deals row
* [ ] Scrape real genres/tags
* [ ] Add genre-based backend filtering
* [ ] Add scheduled scraping
* [ ] Add tests
* [ ] Add deployment
* [ ] Add price history

---

## Notes

* This project is for educational and portfolio purposes.
* Steam page structure may change over time, which may require selector updates.
* Always review scraping rules and site terms before expanding or deploying a scraper.

---

## License

MIT

---

## Author

Built by **Isaiah Lane**
