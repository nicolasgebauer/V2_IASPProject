from pydantic import BaseModel

class Integration(BaseModel):
    name : str
    url : str
    type : str
