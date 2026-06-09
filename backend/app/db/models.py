from sqlalchemy import Float, Integer, String, true
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

class Game(Base):
    __tablename__ = "games"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True)
    release_date: Mapped[str] = mapped_column(String)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    discount_percent: Mapped[int | None] = mapped_column(Integer, nullable=True)
    original_price: Mapped[float | None] = mapped_column(Float, nullable=True)
    final_price: Mapped[float | None] = mapped_column(Float, nullable=True)
    discount_amount: Mapped[float | None] = mapped_column(Float, nullable=True)
    product_url: Mapped[str] = mapped_column(String, nullable=True, unique=True)