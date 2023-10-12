from sqlalchemy.orm import Session
from .database import ProductORM

def create_product(db: Session, product):
    db_product = ProductORM(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, product_id: int):
    return db.query(ProductORM).filter(ProductORM.id == product_id).first()

def get_products(db: Session):
    return db.query(ProductORM).all()

def update_product(db: Session, product_id: int, product_data):
    db_product = db.query(ProductORM).filter(ProductORM.id == product_id).first()
    for key, value in product_data.dict().items():
        setattr(db_product, key, value)
    db.commit()
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(ProductORM).filter(ProductORM.id == product_id).first()
    db.delete(db_product)
    db.commit()
    return db_product
