from pydantic import BaseModel

class Warehouse(BaseModel):
    name: str
    type: str
    removed: int

