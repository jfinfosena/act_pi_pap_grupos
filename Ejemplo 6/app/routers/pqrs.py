from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.crud import crud
from app.schemas.schemas import Receta, RecetaCreate, RecetaUpdate
from app.database.database import get_db

router = APIRouter(
    prefix="/recetas",
    tags=["recetas"],
)

@router.post("/", response_model=Receta)
def create_receta(receta: RecetaCreate, db: Session = Depends(get_db)):
    return crud.create_receta(db=db, receta=receta)

@router.get("/", response_model=List[Receta])
def read_recetas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_recetas(db, skip=skip, limit=limit)

@router.delete("/{receta_id}")
def delete_receta(receta_id: int, db: Session = Depends(get_db)):
    success = crud.delete_receta(db, receta_id)
    if not success:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return {"ok": True}

@router.put("/{receta_id}", response_model=Receta)
def update_receta(receta_id: int, receta_update: RecetaUpdate, db: Session = Depends(get_db)):
    receta = crud.update_receta(db, receta_id, receta_update)
    if not receta:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return receta
