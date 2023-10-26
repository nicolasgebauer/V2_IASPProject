from sqlalchemy.orm import Session
from .database import ProductORM, es  # Asumiendo que has instanciado `es` en `database.py`

# Funciones auxiliares para interactuar con Elasticsearch

def instance_to_dict(instance):
    """Convert SQLAlchemy instance to dictionary, excluding non-serializable attributes."""
    d = {}
    for column in instance.__table__.columns:
        d[column.name] = getattr(instance, column.name)
    return d


def index_product(product_id, product_data):
    try:
        serializable_data = instance_to_dict(product_data)
        es.index(index="products", id=product_id, body=serializable_data)
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
                "query_string": {
                    "query": query_string,
                }
            }
        })
        return response['hits']['hits']
    except Exception as e:
        print(f"Error al buscar el producto: {e}")
        return []


# Tus funciones CRUD...
def create_product(db: Session, product):
    db_product = ProductORM(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    index_product(db_product.id, db_product)  # Pasar el objeto directamente
    return db_product


def get_product(db: Session, sku: str):
    return db.query(ProductORM).filter(ProductORM.sku == sku).first()

def get_products(db: Session):
    return db.query(ProductORM).all()

def update_product(db: Session, sku: str, product_data):
    db_product = db.query(ProductORM).filter(ProductORM.sku == sku).first()
    for key, value in product_data.dict().items():
        setattr(db_product, key, value)
    db.commit()
    index_product(db_product.id, db_product)  # Pasar el objeto directamente
    return db_product

def delete_product(db: Session, id: int):
    db_product = db.query(ProductORM).get(id)
    db.delete(db_product)
    db.commit()
    delete_product_from_index(id)
    return db_product