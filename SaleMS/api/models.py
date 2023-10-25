from pydantic import BaseModel
from datetime import datetime

class SaleSerializer(BaseModel):
    integration_id : int
    date : datetime
    state : str
    country : str
    city : str
    municipality : str
    street : str
    number_street : str
    client_rut : str
    client_name : str
    client_email : str     
    removed : int

class SalesProductSerializer(BaseModel):
    sale_id : int
    product_id : int
    count : int
    removed : int

class Sale(BaseModel):
    id : int
    integration_id : int
    date : datetime
    state : str
    country : str
    city : str
    municipality : str
    street : str
    number_street : str
    client_rut : str
    client_name : str
    client_email : str    
    removed : int

class SalesProduct(BaseModel):
    id : int
    sale_id : int
    product_id : int
    count : int
    removed : int
