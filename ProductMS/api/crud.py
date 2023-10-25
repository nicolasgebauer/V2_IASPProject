from sqlalchemy.orm import Session
from .database import ProductORM, es  # Asumiendo que has instanciado `es` en `database.py`

# Funciones auxiliares para interactuar con Elasticsearch

def index_product(product_id, product_data):
    try:
        es.index(index="products", id=product_id, body=product_data)
    except Exception as e:
        print(f"Error al indexar el producto: {e}")

def delete_product_from_index(product_id):
    try:
        es.delete(index="products", id=product_id)
    except Exception as e:
        print(f"Error al eliminar el producto del índice: {e}")

def search_product(query_string):
    try:
        response = es.search(index="products", body={
            "query": {
                "multi_match": {
                    "query": query_string,
                    "fields": ["name", "description"]  # Ajusta los campos según tus necesidades
                }
            }
        })
        return response['hits']['hits']
    except Exception as e:
        print(f"Error al buscar el producto: {e}")
        return []

# Tus funciones CRUD...

def get_product(db: Session, product_id: int):
    return db.query(ProductORM).filter(ProductORM.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 10):
    return db.query(ProductORM).offset(skip).limit(limit).all()

def create_product(db: Session, product):
    db_product = ProductORM(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    index_product(db_product.id, db_product.__dict__)
    return db_product

def update_product(db: Session, product_id: int, product_data):
    db_product = db.query(ProductORM).filter(ProductORM.id == product_id).first()
    for key, value in product_data.dict().items():
        setattr(db_product, key, value)
    db.commit()
    index_product(product_id, db_product.__dict__)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(ProductORM).filter(ProductORM.id == product_id).first()
    db.delete(db_product)
    db.commit()
    delete_product_from_index(product_id)
    return db_product
