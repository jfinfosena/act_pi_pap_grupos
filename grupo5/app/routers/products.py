from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.crud import crud
from app.schemas.schemas import Auto, AutoCreate, AutoUpdate
from app.database.database import get_db

router = APIRouter(
    prefix="/autos",
    tags=["autos"],
)

@router.post("/", response_model=Auto)
def create_auto(auto: AutoCreate, db: Session = Depends(get_db)):
    return crud.create_auto(db=db, auto=auto)

@router.get("/", response_model=List[Auto])
def read_autos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_autos(db, skip=skip, limit=limit)

@router.get("/{auto_id}", response_model=Auto)
def read_auto(auto_id: int, db: Session = Depends(get_db)):
    db_auto = crud.get_auto(db, auto_id=auto_id)
    if db_auto is None:
        raise HTTPException(status_code=404, detail="Auto no encontrado")
    return db_auto

@router.put("/{auto_id}", response_model=Auto)
def update_auto(auto_id: int, auto: dict, db: Session = Depends(get_db)):
    # Permitir parches parciales
    db_auto = crud.get_auto(db, auto_id=auto_id)
    if db_auto is None:
        raise HTTPException(status_code=404, detail="Auto no encontrado")
    for key, value in auto.items():
        setattr(db_auto, key, value)
    db.commit()
    db.refresh(db_auto)
    return db_auto

@router.delete("/{auto_id}", response_model=Auto)
def delete_auto(auto_id: int, db: Session = Depends(get_db)):
    db_auto = crud.delete_auto(db, auto_id=auto_id)
    if db_auto is None:
        raise HTTPException(status_code=404, detail="Auto no encontrado")
    return db_auto
