from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String

DATABASE_URL = "postgresql+psycopg2://fastapi_user:fastapi_password@db:5432/fastapi_db"
# DATABASE_URL = "postgresql://fastapi_user:fastapi_password@db:5432/fastapi_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class IntegrationORM(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)
    type = Column(String)

