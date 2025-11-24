from sqlalchemy import Column, Integer, String, DateTime
from app.database.database import Base
from datetime import datetime

class PQRS(Base):
    __tablename__ = "pqrs"
    id = Column(Integer, primary_key=True, index=True)
    nombre_usuario = Column(String, nullable=False)
    email = Column(String, nullable=False)
    tipo = Column(String, nullable=False)  # Petición, Queja, Reclamo, Sugerencia
    mensaje = Column(String, nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)
