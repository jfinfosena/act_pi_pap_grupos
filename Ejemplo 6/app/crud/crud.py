from sqlalchemy.orm import Session
from app.models.models import Receta
from app.schemas.schemas import RecetaCreate, RecetaUpdate

def create_receta(db: Session, receta: RecetaCreate):
    db_receta = Receta(**receta.dict())
    db.add(db_receta)
    db.commit()
    db.refresh(db_receta)
    return db_receta

def get_recetas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Receta).offset(skip).limit(limit).all()

def delete_receta(db: Session, receta_id: int):
    receta = db.query(Receta).filter(Receta.id == receta_id).first()
    if receta:
        db.delete(receta)
        db.commit()
        return True
    return False

def update_receta(db: Session, receta_id: int, receta_update: RecetaUpdate):
    receta = db.query(Receta).filter(Receta.id == receta_id).first()
    if not receta:
        return None
    for field, value in receta_update.dict(exclude_unset=True).items():
        setattr(receta, field, value)
    db.commit()
    db.refresh(receta)
    return receta
