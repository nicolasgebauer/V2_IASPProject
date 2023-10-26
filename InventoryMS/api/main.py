from fastapi import FastAPI, HTTPException, Depends, Query
from typing import List
from sqlalchemy.orm import Session
from .database import InventoryORM, engine, SessionLocal
from .crud import create_inventory, get_inventory, get_inventorys, update_inventory, delete_inventory
from .crud import get_inventory_by_warehouse_and_product, get_inventory_by_warehouse, check_warehouses_for_sale, update_inventory_by_sale
from .models import Inventory, InventorySerializer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


InventoryORM.__table__.create(bind=engine, checkfirst=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/inventorys/", response_model=Inventory)
def create_inventory_route(inventory: InventorySerializer, db: Session = Depends(get_db)):
    return create_inventory(db, inventory)

@app.get("/inventorys/{inventory_id}", response_model=Inventory)
def get_inventory_route(inventory_id: int, db: Session = Depends(get_db)):
    inventory = get_inventory(db, inventory_id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inventory

@app.get("/inventorys/", response_model=List[Inventory])
def list_inventorys_route(db: Session = Depends(get_db)):
    return get_inventorys(db)

@app.put("/inventorys/{product_id}/{warehouse_id}", response_model=Inventory)
def update_inventory_route(product_id: int, warehouse_id: int, inventory_data: Inventory, db: Session = Depends(get_db)):
    updated_inventory = update_inventory(db, product_id, warehouse_id, inventory_data)
    if not updated_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return updated_inventory


@app.delete("/inventorys/{inventory_id}", response_model=Inventory)
def delete_inventory_route(inventory_id: int, db: Session = Depends(get_db)):
    deleted_inventory = delete_inventory(db, inventory_id)
    if not deleted_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return deleted_inventory

@app.get("/inventorys/warehouse/{warehouse_id}/product/{product_id}", response_model=Inventory)
def get_inventory_by_warehouse_and_product_route(warehouse_id: int, product_id: int, db: Session = Depends(get_db)):
    inventory = get_inventory_by_warehouse_and_product(db, warehouse_id, product_id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inventory

@app.get("/inventorys/warehouse/{warehouse_id}", response_model=List[Inventory])
def get_inventory_by_warehouse_route(warehouse_id: int, db: Session = Depends(get_db)):
    return get_inventory_by_warehouse(db, warehouse_id)

@app.get("/inventorys/chck_sale/{sale_products}", response_model=List[int])
def check_warehouses_for_sale_route(sale_products: str, db: Session = Depends(get_db)):
    import json
    try:
        sale_products = json.loads(sale_products)
        if not isinstance(sale_products, list):
            raise ValueError("sale_products debe ser una lista.")
        return check_warehouses_for_sale(db, sale_products)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="sale_products debe ser una lista de diccionarios en formato JSON.")


@app.post("/inventorys/update_sale", response_model=List[Inventory])
def update_inventory_by_sale_route( warehouse_id: int,sale_products: List[dict], db: Session = Depends(get_db)):
    return update_inventory_by_sale(db, sale_products, warehouse_id)