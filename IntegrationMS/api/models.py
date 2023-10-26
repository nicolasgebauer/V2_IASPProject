from pydantic import BaseModel

class IntegrationSerializer(BaseModel):
    name : str
    url : str
    type : str

class Integration(BaseModel):
    id : int
    name : str
    url : str
    type : str
