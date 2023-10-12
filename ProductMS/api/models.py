from pydantic import BaseModel

class Product(BaseModel):
    id: int
    sku: str
    parentsku: str
    size: str
    gender: str
    price: float
    cost: float
    codebar: str
    name: str
    category: str
    removed: int
