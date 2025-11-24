from sqlalchemy import Column, Integer, String, DateTime
from app.database.database import Base
from datetime import datetime

class Receta(Base):
    __tablename__ = "recetas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    ingredientes = Column(String, nullable=False)  # Lista simple separada por comas
    pasos = Column(String, nullable=False)         # Texto largo
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
