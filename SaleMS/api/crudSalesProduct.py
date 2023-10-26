from sqlalchemy.orm import Session
from .database import SalesProductORM
from sqlalchemy.sql import func

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

def get_amount_sales_of_product(db: Session, product_id: int):
    return db.query(SalesProductORM).filter(SalesProductORM.product_id == product_id).count()

def get_amount_sales_per_products(db: Session):
    return db.query(SalesProductORM.product_id).count()

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

def get_products_by_sale(db: Session, sale_id: int):
    return db.query(SalesProductORM).filter(SalesProductORM.sale_id == sale_id).all()

# def count_sales_per_product(db: Session):
#     return db.query(
#         SalesProductORM.product_id,
#         func.sum(SalesProductORM.amount).label('total_sales')
#     ).group_by(SalesProductORM.product_id).order_by(func.sum(SalesProductORM.amount).desc()).all()