from pydantic import BaseModel

class Warehouse(BaseModel):
    id: int
    name: str
    type: str
    removed: int

