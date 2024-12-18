from pydantic import BaseModel, Field, field_validator
from typing import List, Dict, Optional
from datetime import datetime, timezone
# custom
from util.helper import is_snake_case

class PromotionModel(BaseModel):
    promotion_id: str = Field(title="promotion id", description="promotion id is required")
    name: str = Field(title="promotion name", description="name is required and must be 1-50")
    description: str = Field(title="promotion description", description="description of the promotion")
    start_date: str = Field(title="promotion start date", description="œpromotion start date in iso string format")
    end_date: str = Field(title="promotion end date", description="promotion end date in iso string format")
    percentage: int = Field(title="promotion percentage", description="promotion percentage", min=1, max=100)
    
    @field_validator("name", mode="before")
    def parse_name(cls, value: str):
        return value.lower()        

class PromotionRequestModel(BaseModel):    
    name: str = Field(title="promotion name", description="name is required and must be 1-50")
    description: str = Field(title="promotion description", description="description of the promotion")
    start_date: str = Field(title="promotion start date", description="œpromotion start date in iso string format")
    end_date: str = Field(title="promotion end date", description="promotion end date in iso string format")
    percentage: int = Field(title="promotion percentage", description="promotion percentage", min=1, max=100)
    
    @field_validator("name")
    def check_if_snake_case(cls, value: str):
        if not is_snake_case(value):
            raise ValueError('value must follow snake case format')
        return value.title()    
    
    # validate start date
    @field_validator("start_date")
    def parse_iso_string(cls, value: str) -> str:
        if not check_is_iso_string(value):
            raise ValueError('Start date must be in iso string format')
        return value.title()
    
    # validate end date
    @field_validator("end_date")
    def parse_iso_string(cls, value: str) -> str:
        if not check_is_iso_string(value):
            raise ValueError('End date must be in iso string format')
        return value.title()

class PromoQueryRequestModel(BaseModel):    
    curr_date: str = Field(title="current date", description="provide current date to validate promotion")
    
    # validate current date
    @field_validator("curr_date")
    def parse_iso_string(cls, value: str) -> str:
        if not check_is_iso_string(value):
            raise ValueError('Current date must be in iso string format')
        return value.title()


class PromoQueryResponseModel(BaseModel):    
    validity: bool = Field(title="promotion validity", description="is the promotion valid or not")
    message: str = Field(title="promotion message", description="details about the queried promotion")
    details: Optional[PromotionRequestModel] = Field(default=None, title="promotion details", description="promotion details")
    
# for parsing
def promotion_response_entity(item) -> Dict:
    return {
        "promotion_id": item["promotion_id"],
        "name": item["name"],
        "description": item["description"],
        "start_date": item["start_date"],
        "end_date": item["end_date"],
        "percentage": item["percentage"],    
    }

def promotions_response_entity(entity) -> List:
    return [promotion_response_entity(item) for item in entity]


def check_is_iso_string(value: str) -> bool:
    try:
        datetime.fromisoformat(value.replace('Z', '+00:00'))
        return True
    except ValueError:
        return False