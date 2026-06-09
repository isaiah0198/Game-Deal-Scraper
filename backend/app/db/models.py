from typing import Optional

from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Game(Base):
    __tablename__ = "games"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    release_date: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    discount_percent: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    original_price: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    final_price: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    discount_amount: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    product_url: Mapped[Optional[str]] = mapped_column(String, nullable=True, unique=True)