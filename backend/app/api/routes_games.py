from typing import List, Optional

from fastapi import APIRouter
from sqlalchemy import select

from app.db.models import Game
from app.db.session import SessionLocal
from app.schemas.game import GameRead

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/games", response_model=List[GameRead])
def get_games(
    q: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_discount: Optional[int] = None,
    sort: str = "discount_desc",
) -> list[GameRead]:
    with SessionLocal() as session:
        query = select(Game)

        if q:
            query = query.where(Game.title.ilike(f"%{q}%"))

        if min_price is not None:
            query = query.where(Game.final_price >= min_price)

        if max_price is not None:
            query = query.where(Game.final_price <= max_price)

        if min_discount is not None:
            query = query.where(Game.discount_percent >= min_discount)

        if sort == "price_asc":
            query = query.order_by(Game.final_price.asc())
        elif sort == "price_desc":
            query = query.order_by(Game.final_price.desc())
        elif sort == "discount_asc":
            query = query.order_by(Game.discount_percent.asc())
        else:
            query = query.order_by(Game.discount_percent.desc(), Game.final_price.asc())

        games = session.execute(query).scalars().all()
        return list(games)