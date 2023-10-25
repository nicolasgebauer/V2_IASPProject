from fastapi import FastAPI, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from .database import IntegrationORM, engine, SessionLocal
from .crud import create_integration, get_integration, get_integrations, update_integration, delete_integration
from .models import Integration
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

# Crear tablas en la base de datos
IntegrationORM.__table__.create(bind=engine, checkfirst=True)

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/integrations/", response_model=Integration)
def create_integration_route(integration: Integration, db: Session = Depends(get_db)):
    return create_integration(db, integration)

@app.get("/integrations/{integration_id}", response_model=Integration)
def get_integration_route(integration_id: int, db: Session = Depends(get_db)):
    integration = get_integration(db, integration_id)
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    return integration

@app.get("/integrations/", response_model=List[Integration])
def list_integrations_route(db: Session = Depends(get_db)):
    return get_integrations(db)

@app.put("/integrations/{integration_id}", response_model=Integration)
def update_integration_route(integration_id: int, integration_data: Integration, db: Session = Depends(get_db)):
    updated_integration = update_integration(db, integration_id, integration_data)
    if not updated_integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    return updated_integration

@app.delete("/integrations/{integration_id}", response_model=Integration)
def delete_integration_route(integration_id: int, db: Session = Depends(get_db)):
    deleted_integration = delete_integration(db, integration_id)
    if not deleted_integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    return deleted_integration
