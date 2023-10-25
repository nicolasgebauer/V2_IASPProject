from sqlalchemy.orm import Session
from .database import InventoryORM
from typing import List, Dict

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

def get_inventory_by_warehouse_and_product(db: Session, warehouse_id: int, product_id: int):
    return db.query(InventoryORM).filter(InventoryORM.warehouse_id == warehouse_id, InventoryORM.product_id == product_id).first()

def get_inventory_by_warehouse(db: Session, warehouse_id: int):
    return db.query(InventoryORM).filter(InventoryORM.warehouse_id == warehouse_id).all()

def check_warehouses_for_sale(db: Session, sale_products: List[Dict]):
    warehouses = set()
    for product in sale_products:
        product_id = product["product_id"]
        required_quantity = product["count"]
        
        # Buscar en qué almacenes se puede satisfacer este producto y cantidad
        available_warehouses = db.query(InventoryORM.warehouse_id).\
            filter(InventoryORM.product_id == product_id, InventoryORM.amount >= required_quantity).\
            all()
        
        available_warehouses = {warehouse_id for warehouse_id, in available_warehouses}
        
        # Si es el primer producto, inicializar la lista de almacenes
        if not warehouses:
            warehouses = available_warehouses
        else:
            # Si no es el primer producto, intersectar con los almacenes existentes
            warehouses.intersection_update(available_warehouses)
        
        # Si en algún punto no hay almacenes disponibles, salir del bucle
        if not warehouses:
            break
    
    return list(warehouses)

def update_inventory_by_sale(db: Session, sale_products: List[Dict], warehouse_id: int):
    inventory = db.query(InventoryORM).filter(InventoryORM.warehouse_id == warehouse_id).all()
    for product in sale_products:
        product_id = product["product_id"]
        required_quantity = product["count"]
        for inv in inventory:
            if inv.product_id == product_id:
                inv.amount -= required_quantity
                db.commit()
        
    return inventory