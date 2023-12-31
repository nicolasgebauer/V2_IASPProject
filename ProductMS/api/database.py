# Tus imports actuales...
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Float
from elasticsearch import Elasticsearch  # <- Nuevo import

# Tu código existente...
DATABASE_URL = "postgresql+psycopg2://fastapi_user:fastapi_password@db:5432/fastapi_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

es = Elasticsearch([{"host": "elasticsearch", "port": 9200, "scheme": "http"}])

# Tu modelo ORM existente...
class ProductORM(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, index=True, unique=True)
    parentsku = Column(String, index=True)
    size = Column(String)
    gender = Column(String)
    price = Column(Float)
    cost = Column(Float)
    codebar = Column(String, index=True)
    name = Column(String)
    category = Column(String)
    removed = Column(Integer)