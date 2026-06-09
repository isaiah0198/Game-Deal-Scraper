from typing import Optional

from pydantic import BaseModel


class GameRead(BaseModel):
    id: int
    title: Optional[str]
    release_date: Optional[str]
    image_url: Optional[str]
    discount_percent: Optional[int]
    original_price: Optional[float]
    final_price: Optional[float]
    discount_amount: Optional[float]
    product_url: Optional[str]

    class Config:
        orm_mode = True