from pydantic import BaseModel

class Inventory(BaseModel):
    product_id: int
    warehouse_id : int
    amount : int
