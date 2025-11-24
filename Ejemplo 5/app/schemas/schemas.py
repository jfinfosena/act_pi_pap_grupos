from pydantic import BaseModel
from typing import Optional

class AutoBase(BaseModel):
    marca: str
    modelo: str
    anio: int
    precio: float
    imagen_url: Optional[str] = None

class AutoCreate(AutoBase):
    pass

class AutoUpdate(AutoBase):
    vendido: Optional[bool] = None

class Auto(AutoBase):
    id: int
    vendido: bool
    class Config:
        orm_mode = True
