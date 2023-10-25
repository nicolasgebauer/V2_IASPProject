from fastapi import FastAPI, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, SaleORM, SalesProductORM
from .crudSale import create_sale, get_sale, get_sales, update_sale, delete_sale
from .crudSalesProduct import create_sales_product, get_sales_product, get_sales_products, update_sales_product, delete_sales_product
from .models import Sale, SalesProduct, SaleSerializer, SalesProductSerializer
app = FastAPI()

# Crear tablas en la base de datos
SaleORM.__table__.create(bind=engine, checkfirst=True)
SalesProductORM.__table__.create(bind=engine, checkfirst=True)

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

##SALE
@app.post("/sales/", response_model=Sale)
def create_sale_route(sale: SaleSerializer, db: Session = Depends(get_db)):
    return create_sale(db, sale)

@app.get("/sales/{sale_id}", response_model=Sale)
def get_sale_route(sale_id: int, db: Session = Depends(get_db)):
    sale = get_sale(db, sale_id)
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return sale

@app.get("/sales/", response_model=List[Sale])
def list_sales_route(db: Session = Depends(get_db)):
    return get_sales(db)

@app.put("/sales/{sale_id}", response_model=Sale)
def update_sale_route(sale_id: int, sale_data: Sale, db: Session = Depends(get_db)):
    updated_sale = update_sale(db, sale_id, sale_data)
    if not updated_sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return updated_sale

@app.delete("/sales/{sale_id}", response_model=Sale)
def delete_sale_route(sale_id: int, db: Session = Depends(get_db)):
    deleted_sale = delete_sale(db, sale_id)
    if not deleted_sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return deleted_sale


##SALES_PRODUCT
@app.post("/sales_products/", response_model=SalesProduct)
def create_sales_product_route(sales_product: SalesProductSerializer, db: Session = Depends(get_db)):
    return create_sales_product(db, sales_product)

@app.get("/sales_product/{sales_product_id}", response_model=SalesProduct)
def get_sales_product_route(sales_product_id: int, db: Session = Depends(get_db)):
    sales_product = get_sales_product(db, sales_product_id)
    if not sales_product:
        raise HTTPException(status_code=404, detail="SalesProduct not found")
    return sales_product

@app.get("/sales_product/", response_model=List[SalesProduct])
def list_sales_product_route(db: Session = Depends(get_db)):
    return get_sales_product(db)

@app.put("/sales_products/{sales_product_id}", response_model=SalesProduct)
def update_sales_product_route(sales_product_id: int, sales_product_data: SalesProduct, db: Session = Depends(get_db)):
    updated_sales_product = update_sales_product(db, sales_product_id, sales_product_data)
    if not updated_sales_product:
        raise HTTPException(status_code=404, detail="SalesProduct not found")
    return updated_sales_product

@app.delete("/sales_products/{sales_product_id}", response_model=SalesProduct)
def delete_sales_product_route(sales_product_id: int, db: Session = Depends(get_db)):
    deleted_sales_product = delete_sales_product(db, sales_product_id)
    if not deleted_sales_product:
        raise HTTPException(status_code=404, detail="SalesProduct not found")
    return deleted_sales_product
