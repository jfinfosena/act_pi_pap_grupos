from sqlalchemy.orm import Session
from app.models.models import Auto
from app.schemas.schemas import AutoCreate, AutoUpdate

def get_auto(db: Session, auto_id: int):
    return db.query(Auto).filter(Auto.id == auto_id).first()

def get_autos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Auto).offset(skip).limit(limit).all()

def create_auto(db: Session, auto: AutoCreate):
    db_auto = Auto(**auto.dict())
    db.add(db_auto)
    db.commit()
    db.refresh(db_auto)
    return db_auto

def update_auto(db: Session, auto_id: int, auto: AutoUpdate):
    db_auto = get_auto(db, auto_id)
    if db_auto:
        for key, value in auto.dict(exclude_unset=True).items():
            setattr(db_auto, key, value)
        db.commit()
        db.refresh(db_auto)
    return db_auto

def delete_auto(db: Session, auto_id: int):
    db_auto = get_auto(db, auto_id)
    if db_auto:
        db.delete(db_auto)
        db.commit()
    return db_auto
