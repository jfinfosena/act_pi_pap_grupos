from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.database import Base

class Auto(Base):
    __tablename__ = "autos"
    id = Column(Integer, primary_key=True)
    marca = Column(String)
    modelo = Column(String)
    anio = Column(Integer)
    precio = Column(Float(precision=2))
    imagen_url = Column(String, nullable=True)
    vendido = Column(Boolean, default=False)
