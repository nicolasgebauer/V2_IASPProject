from sqlalchemy.orm import Session
from .database import IntegrationORM

def create_integration(db: Session, integration):
    db_integration = IntegrationORM(**integration.dict())
    db.add(db_integration)
    db.commit()
    db.refresh(db_integration)
    return db_integration

def get_integration(db: Session, integration_id: int):
    return db.query(IntegrationORM).filter(IntegrationORM.id == integration_id).first()

def get_integrations(db: Session):
    return db.query(IntegrationORM).all()

def update_integration(db: Session, integration_id: int, integration_data):
    db_integration = db.query(IntegrationORM).filter(IntegrationORM.id == integration_id).first()
    for key, value in integration_data.dict().items():
        setattr(db_integration, key, value)
    db.commit()
    return db_integration

def delete_integration(db: Session, integration_id: int):
    db_integration = db.query(IntegrationORM).filter(IntegrationORM.id == integration_id).first()
    db.delete(db_integration)
    db.commit()
    return db_integration
