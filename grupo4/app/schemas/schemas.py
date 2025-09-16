from pydantic import BaseModel
from typing import List, Optional

class ReviewBase(BaseModel):
    rating: int
    comment: str

class ReviewCreate(ReviewBase):
    user_id: int
    product_id: int

class ReviewUpdate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    user_id: int
    product_id: int

    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    price: float
    type: str  # Nuevo campo para tipo de producto

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    reviews: List[Review] = []

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int
    reviews: List[Review] = []

    class Config:
        orm_mode = True

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: int

class CartItem(CartItemBase):
    id: int
    product: Optional[Product] = None

    class Config:
        orm_mode = True
