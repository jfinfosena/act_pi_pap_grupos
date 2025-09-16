from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.crud import crud
from app.schemas.schemas import PQRS, PQRSCreate, PQRSUpdate
from app.database.database import get_db

router = APIRouter(
    prefix="/pqrs",
    tags=["pqrs"],
)

@router.post("/", response_model=PQRS)
def create_pqrs(pqrs: PQRSCreate, db: Session = Depends(get_db)):
    return crud.create_pqrs(db=db, pqrs=pqrs)

@router.get("/", response_model=List[PQRS])
def read_pqrs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_pqrs(db, skip=skip, limit=limit)

@router.put("/{pqrs_id}", response_model=PQRS)
def update_pqrs(pqrs_id: int, pqrs: PQRSUpdate, db: Session = Depends(get_db)):
    db_pqrs = crud.update_pqrs(db, pqrs_id=pqrs_id, pqrs_update=pqrs)
    if db_pqrs is None:
        raise HTTPException(status_code=404, detail="PQRS not found")
    return db_pqrs

@router.delete("/{pqrs_id}", response_model=PQRS)
def delete_pqrs(pqrs_id: int, db: Session = Depends(get_db)):
    db_pqrs = crud.delete_pqrs(db, pqrs_id=pqrs_id)
    if db_pqrs is None:
        raise HTTPException(status_code=404, detail="PQRS not found")
    return db_pqrs
