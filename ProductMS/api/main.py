from fastapi import FastAPI, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from .crud import create_product, get_product, get_products, update_product, delete_product, search_product
from .models import Product
from .database import SessionLocal, engine, ProductORM
from .models import Product, ProductSerializer
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

@app.get("/search/")
async def search_products(q: str):
    products = search_product(q)
    return [hit["_source"] for hit in products]


# Crear tablas en la base de datos
ProductORM.__table__.create(bind=engine, checkfirst=True)

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/products/", response_model=Product)
def create_product_route(product: ProductSerializer, db: Session = Depends(get_db)):
    return create_product(db, product)

@app.get("/products/{sku}", response_model=Product)
def get_product_route(sku: str, db: Session = Depends(get_db)):
    product = get_product(db, sku)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/products/", response_model=List[Product])
def list_products_route(db: Session = Depends(get_db)):
    return get_products(db)

@app.put("/products/{sku}", response_model=Product)
def update_product_route(sku: str, product_data: Product, db: Session = Depends(get_db)):
    updated_product = update_product(db, sku, product_data)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@app.delete("/products/{id}/")
async def delete_product_id(id: int = id, db: Session = Depends(get_db)):
    product = delete_product(db, id=id)
    return {}

