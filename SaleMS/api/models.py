from pydantic import BaseModel
from datetime import datetime

class Sale(BaseModel):
    integration_id : int
    date : datetime
    amount_products : int
    total_price : float
    removed : int

class SalesProduct(BaseModel):
    sale_id : int
    product_id : int
    removed : int
