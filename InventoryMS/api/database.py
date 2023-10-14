from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer

DATABASE_URL = "postgresql+psycopg2://fastapi_user:fastapi_password@db:5432/fastapi_db"
# DATABASE_URL = "postgresql://fastapi_user:fastapi_password@db:5432/fastapi_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class InventoryORM(Base):
    __tablename__ = "inventorys"

    id = Column(Integer, primary_key=True, index=True)
    #dada las otras API's como puedo hacer product = Column(Integer, ForeignKey("product.id")) y warehouse = Column(Integer, ForeignKey("warehouse.id"))
    product = Column(Integer)
    warehouse = Column(Integer)
    amount = Column(Integer)

