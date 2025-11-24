from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.crud import crud
from app.schemas import schemas
from app.database.database import get_db

router = APIRouter(
    prefix="/cart",
    tags=["cart"],
)

@router.get("/", response_model=List[schemas.CartItem])
def get_cart(db: Session = Depends(get_db)):
    return crud.get_cart_items(db)

@router.post("/add", response_model=schemas.CartItem)
def add_to_cart(item: schemas.CartItemCreate, db: Session = Depends(get_db)):
    return crud.add_to_cart(db, item)

@router.put("/{cart_item_id}", response_model=schemas.CartItem)
def update_cart_item(cart_item_id: int, item: schemas.CartItemUpdate, db: Session = Depends(get_db)):
    db_item = crud.update_cart_item(db, cart_item_id, item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return db_item

@router.delete("/{cart_item_id}", response_model=schemas.CartItem)
def remove_from_cart(cart_item_id: int, db: Session = Depends(get_db)):
    db_item = crud.remove_from_cart(db, cart_item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return db_item

@router.post("/clear")
def clear_cart(db: Session = Depends(get_db)):
    crud.clear_cart(db)
    return {"message": "Cart cleared"}
