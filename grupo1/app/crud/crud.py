from sqlalchemy.orm import Session
from app.models.models import PQRS
from app.schemas.schemas import PQRSCreate

def create_pqrs(db: Session, pqrs: PQRSCreate):
    db_pqrs = PQRS(**pqrs.dict())
    db.add(db_pqrs)
    db.commit()
    db.refresh(db_pqrs)
    return db_pqrs

def get_pqrs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(PQRS).offset(skip).limit(limit).all()

def update_pqrs(db: Session, pqrs_id: int, pqrs_update):
    db_pqrs = db.query(PQRS).filter(PQRS.id == pqrs_id).first()
    if not db_pqrs:
        return None
    for key, value in pqrs_update.dict(exclude_unset=True).items():
        setattr(db_pqrs, key, value)
    db.commit()
    db.refresh(db_pqrs)
    return db_pqrs

def delete_pqrs(db: Session, pqrs_id: int):
    db_pqrs = db.query(PQRS).filter(PQRS.id == pqrs_id).first()
    if not db_pqrs:
        return None
    db.delete(db_pqrs)
    db.commit()
    return db_pqrs