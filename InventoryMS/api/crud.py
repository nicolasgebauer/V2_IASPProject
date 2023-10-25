from sqlalchemy.orm import Session
from .database import InventoryORM
from sqlalchemy import and_
from .models import Inventory
from sqlalchemy import update


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

def update_inventory(db, product_id, warehouse_id, inventory_data):
    updated_inventory = db.query(InventoryORM).filter(
        (InventoryORM.product_id == product_id) &
        (InventoryORM.warehouse_id == warehouse_id)
    ).first()

    if updated_inventory:
        for key, value in inventory_data.dict().items():
            setattr(updated_inventory, key, value)

        db.commit()

    return updated_inventory

def delete_inventory(db: Session, inventory_id: int):
    db_inventory = db.query(InventoryORM).filter(InventoryORM.id == inventory_id).first()
    db.delete(db_inventory)
    db.commit()
    return db_inventory
