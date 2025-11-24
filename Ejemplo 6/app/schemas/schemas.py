from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RecetaBase(BaseModel):
    nombre: str
    descripcion: str
    ingredientes: str  # Lista simple separada por comas
    pasos: str

class RecetaCreate(RecetaBase):
    pass

class RecetaUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    ingredientes: Optional[str] = None
    pasos: Optional[str] = None

class Receta(RecetaBase):
    id: int
    fecha_creacion: datetime
    class Config:
        orm_mode = True
