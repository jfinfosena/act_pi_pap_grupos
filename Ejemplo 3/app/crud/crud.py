from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas

# User CRUD
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: schemas.UserUpdate):
    db_user = get_user(db, user_id)
    if db_user:
        for key, value in user.dict(exclude_unset=True).items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

# Product CRUD
def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product: schemas.ProductUpdate):
    db_product = get_product(db, product_id)
    if db_product:
        for key, value in product.dict(exclude_unset=True).items():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = get_product(db, product_id)
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product

# Review CRUD
def get_review(db: Session, review_id: int):
    return db.query(models.Review).filter(models.Review.id == review_id).first()

def get_reviews(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Review).offset(skip).limit(limit).all()

def create_review(db: Session, review: schemas.ReviewCreate):
    db_review = models.Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def update_review(db: Session, review_id: int, review: schemas.ReviewUpdate):
    db_review = get_review(db, review_id)
    if db_review:
        for key, value in review.dict(exclude_unset=True).items():
            setattr(db_review, key, value)
        db.commit()
        db.refresh(db_review)
    return db_review

def delete_review(db: Session, review_id: int):
    db_review = get_review(db, review_id)
    if db_review:
        db.delete(db_review)
        db.commit()
    return db_review

# Cart CRUD

def get_cart_items(db: Session):
    return db.query(models.CartItem).all()

def add_to_cart(db: Session, item: schemas.CartItemCreate):
    db_item = db.query(models.CartItem).filter(models.CartItem.product_id == item.product_id).first()
    if db_item:
        db_item.quantity += item.quantity
    else:
        db_item = models.CartItem(product_id=item.product_id, quantity=item.quantity)
        db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_cart_item(db: Session, cart_item_id: int, item: schemas.CartItemUpdate):
    db_item = db.query(models.CartItem).filter(models.CartItem.id == cart_item_id).first()
    if db_item:
        db_item.quantity = item.quantity
        db.commit()
        db.refresh(db_item)
    return db_item

def remove_from_cart(db: Session, cart_item_id: int):
    db_item = db.query(models.CartItem).filter(models.CartItem.id == cart_item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def clear_cart(db: Session):
    db.query(models.CartItem).delete()
    db.commit()
