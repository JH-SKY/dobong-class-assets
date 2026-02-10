from pydantic import BaseModel, ConfigDict, Field

class CategoryCreateRequest(BaseModel):
    name : str = Field(..., min_length=2, max_length=20)

class CategoryReadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id : int
    name : str
