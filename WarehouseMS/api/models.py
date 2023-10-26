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

class SalesProduct(BaseModel):
    id : int
    sale_id : int
    product_id : int
    count : int
    removed : int