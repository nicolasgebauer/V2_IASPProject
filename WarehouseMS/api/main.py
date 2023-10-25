from fastapi import FastAPI, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, WarehouseORM
from .crud import create_warehouse, get_warehouse, get_warehouses, update_warehouse, delete_warehouse
from .models import Warehouse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=["*"],
)

# Crear tablas en la base de datos
WarehouseORM.__table__.create(bind=engine, checkfirst=True)

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/warehouses/", response_model=Warehouse)
def create_warehouse_route(warehouse: Warehouse, db: Session = Depends(get_db)):
    return create_warehouse(db, warehouse)

@app.get("/warehouses/{warehouse_id}", response_model=Warehouse)
def get_warehouse_route(warehouse_id: int, db: Session = Depends(get_db)):
    warehouse = get_warehouse(db, warehouse_id)
    if not warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return warehouse

@app.get("/warehouses/", response_model=List[Warehouse])
def list_warehouses_route(db: Session = Depends(get_db)):
    return get_warehouses(db)

@app.put("/warehouses/{warehouse_id}", response_model=Warehouse)
def update_warehouse_route(warehouse_id: int, warehouse_data: Warehouse, db: Session = Depends(get_db)):
    updated_warehouse = update_warehouse(db, warehouse_id, warehouse_data)
    if not updated_warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return updated_warehouse

@app.delete("/warehouses/{warehouse_id}", response_model=Warehouse)
def delete_warehouse_route(warehouse_id: int, db: Session = Depends(get_db)):
    deleted_warehouse = delete_warehouse(db, warehouse_id)
    if not deleted_warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return deleted_warehouse
