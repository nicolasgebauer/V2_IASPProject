from pydantic import BaseModel

class InventorySerializer(BaseModel):
    product_id: int
    warehouse_id : int
    amount : int
class Inventory(BaseModel):
    id: int
    product_id: int
    warehouse_id : int
    amount : int
