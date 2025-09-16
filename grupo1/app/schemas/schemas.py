from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class PQRSBase(BaseModel):
    nombre_usuario: str
    email: EmailStr
    tipo: str  # Petición, Queja, Reclamo, Sugerencia
    mensaje: str

class PQRSCreate(PQRSBase):
    pass

class PQRS(PQRSBase):
    id: int
    fecha: datetime
    class Config:
        orm_mode = True

class PQRSUpdate(BaseModel):
    nombre_usuario: Optional[str] = None
    email: Optional[EmailStr] = None
    tipo: Optional[str] = None
    mensaje: Optional[str] = None