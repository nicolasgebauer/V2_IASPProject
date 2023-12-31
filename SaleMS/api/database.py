from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Float, DateTime

DATABASE_URL = "postgresql+psycopg2://fastapi_user:fastapi_password@db:5432/fastapi_db"
# DATABASE_URL = "postgresql://fastapi_user:fastapi_password@db:5432/fastapi_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class SaleORM(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    integration_id = Column(Integer)
    date = Column(DateTime)
    state = Column(String, nullable=True)
    country = Column(String, nullable=True)
    city = Column(String, nullable=True)
    municipality = Column(String, nullable=True)
    street = Column(String, nullable=True)
    number_street = Column(String, nullable=True)
    client_rut = Column(String, nullable=True)
    client_name = Column(String, nullable=True)
    client_email = Column(String, nullable=True)
    removed = Column(Integer)

class SalesProductORM(Base):
    __tablename__ = "sales_products"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer)
    product_id = Column(Integer)
    count = Column(Integer)
    removed = Column(Integer)