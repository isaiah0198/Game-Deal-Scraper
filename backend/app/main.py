from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_games import router as games_router

app = FastAPI(title="Game Deal Scraper API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(games_router)