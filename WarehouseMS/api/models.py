from pydantic import BaseModel

class WarehouseSerializer(BaseModel):
    name: str
    type: str
    removed: int
class Warehouse(BaseModel):
    id: int
    name: str
    type: str
    removed: int

