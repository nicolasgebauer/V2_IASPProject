from sqlalchemy.orm import Session
from .database import SaleORM

def create_sale(db: Session, sale):
    db_sale = SaleORM(**sale.dict())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

def get_sale(db: Session, sale_id: int):
    return db.query(SaleORM).filter(SaleORM.id == sale_id).first()

def get_sales(db: Session):
    return db.query(SaleORM).all()

def get_sales_by_integration_id(db: Session, integration_id: int):
    return db.query(SaleORM).filter(SaleORM.integration_id == integration_id).all()

def get_amount_sales_per_integration_id(db: Session, integration_id: int):
    return db.query(SaleORM).filter(SaleORM.integration_id == integration_id).count()

def update_sale(db: Session, sale_id: int, sale_data):
    db_sale = db.query(SaleORM).filter(SaleORM.id == sale_id).first()
    for key, value in sale_data.dict().items():
        setattr(db_sale, key, value)
    db.commit()
    return db_sale

def delete_sale(db: Session, sale_id: int):
    db_sale = db.query(SaleORM).filter(SaleORM.id == sale_id).first()
    db.delete(db_sale)
    db.commit()
    return db_sale


