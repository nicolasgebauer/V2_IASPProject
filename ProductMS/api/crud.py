from sqlalchemy.orm import Session
from .database import ProductORM

def create_product(db: Session, product):
    db_product = ProductORM(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, sku: str):
    return db.query(ProductORM).filter(ProductORM.sku == sku).first()

def get_products(db: Session):
    return db.query(ProductORM).all()

def update_product(db: Session, sku: str, product_data):
    db_product = db.query(ProductORM).filter(ProductORM.sku == sku).first()
    for key, value in product_data.dict().items():
        setattr(db_product, key, value)
    db.commit()
    return db_product

def delete_product(db: Session, sku: str):
    db_product = db.query(ProductORM).filter(ProductORM.id == sku).first()
    db.delete(db_product)
    db.commit()
    return db_product
