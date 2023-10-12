from sqlalchemy.orm import Session
from .database import WarehouseORM

def create_warehouse(db: Session, warehouse):
    db_warehouse = WarehouseORM(**warehouse.dict())
    db.add(db_warehouse)
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse

def get_warehouse(db: Session, warehouse_id: int):
    return db.query(WarehouseORM).filter(WarehouseORM.id == warehouse_id).first()

def get_warehouses(db: Session):
    return db.query(WarehouseORM).all()

def update_warehouse(db: Session, warehouse_id: int, warehouse_data):
    db_warehouse = db.query(WarehouseORM).filter(WarehouseORM.id == warehouse_id).first()
    for key, value in warehouse_data.dict().items():
        setattr(db_warehouse, key, value)
    db.commit()
    return db_warehouse

def delete_warehouse(db: Session, warehouse_id: int):
    db_warehouse = db.query(WarehouseORM).filter(WarehouseORM.id == warehouse_id).first()
    db.delete(db_warehouse)
    db.commit()
    return db_warehouse
