from sqlalchemy.orm import Session
from .database import SalesProductORM

def create_sales_product(db: Session, sales_product):
    db_sales_product = SalesProductORM(**sales_product.dict())
    db.add(db_sales_product)
    db.commit()
    db.refresh(db_sales_product)
    return db_sales_product

def get_sales_product(db: Session, sales_product_id: int):
    return db.query(SalesProductORM).filter(SalesProductORM.id == sales_product_id).first()

def get_sales_products(db: Session):
    return db.query(SalesProductORM).all()

def update_sales_product(db: Session, sales_product_id: int, sales_product_data):
    db_sales_product = db.query(SalesProductORM).filter(SalesProductORM.id == sales_product_id).first()
    for key, value in sales_product_data.dict().items():
        setattr(db_sales_product, key, value)
    db.commit()
    return db_sales_product

def delete_sales_product(db: Session, sales_product_id: int):
    db_sales_product = db.query(SalesProductORM).filter(SalesProductORM.id == sales_product_id).first()
    db.delete(db_sales_product)
    db.commit()
    return db_sales_product


