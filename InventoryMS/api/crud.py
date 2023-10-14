from sqlalchemy.orm import Session
from .database import InventoryORM

def create_inventory(db: Session, inventory):
    db_inventory = InventoryORM(**inventory.dict())
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory

def get_inventory(db: Session, inventory_id: int):
    return db.query(InventoryORM).filter(InventoryORM.id == inventory_id).first()

def get_inventorys(db: Session):
    return db.query(InventoryORM).all()

def update_inventory(db: Session, inventory_id: int, inventory_data):
    db_inventory = db.query(InventoryORM).filter(InventoryORM.id == inventory_id).first()
    for key, value in inventory_data.dict().items():
        setattr(db_inventory, key, value)
    db.commit()
    return db_inventory

def delete_inventory(db: Session, inventory_id: int):
    db_inventory = db.query(InventoryORM).filter(InventoryORM.id == inventory_id).first()
    db.delete(db_inventory)
    db.commit()
    return db_inventory
