from pydantic import BaseModel, Field, field_validator
from typing import List, Dict, Optional
# custom
from util.helper import is_part_of_list


class ProductModel(BaseModel):
    product_id: str = Field(title="product id", description="product id is required")
    name: str = Field(title="product name", description="name is required and must be 1-50")
    description: str = Field(title="product description", description="description of the product")
    content: str = Field(title="product content", description="content of the product. contains HTML content about the product")
    created_date: str = Field(title="created date", description="date when the product was created")
    price: float = Field(title="product price", description="price of the product with upto 2 digit floating precision")
    currency: float = Field(title="price in currency", description="currency. must be either usd / can / inr / myr")
    quantity: int = Field(title="number of products", description="number of products in stock")
    
    # custom validation
    @field_validator("currency")
    def reg_type_check(cls, v):
        if not is_part_of_list(v, ['usd', 'inr', 'myr']):
            raise ValueError('value must be of type - usd | inr | myr')
        return v.title()

class ProductRequestModel(BaseModel):
    product_id: str = Field(title="product id", description="product id is required")
    name: str = Field(title="product name", description="name is required and must be 1-50")
    description: str = Field(title="product description", description="description of the product")
    content: str = Field(title="product content", description="content of the product. contains HTML content about the product")
    created_date: str = Field(title="created date", description="date when the product was created")
    created_by: str = Field(title="created by author", description="user id of admin who created the product")
    assets: List[str] = Field(title="asset list", description="consists of list of image assets")
    price: float = Field(title="product price", description="price of the product with upto 2 digit floating precision")
    currency: float = Field(title="price in currency", description="currency. must be either usd / can / inr / myr")
    quantity: int = Field(title="number of products", description="number of products in stock")
    
    # custom validation
    @field_validator("currency")
    def reg_type_check(cls, v):
        if not is_part_of_list(v, ['usd', 'inr', 'myr']):
            raise ValueError('value must be of type - usd | inr | myr')
        return v.title()

class ProductResponseModel(BaseModel):
    product_id: str = Field(title="product id", description="product id is required")
    name: str = Field(title="product name", description="name is required and must be 1-50")
    description: str = Field(title="product description", description="description of the product")
    content: str = Field(title="product content", description="content of the product. contains HTML content about the product")
    created_date: str = Field(title="created date", description="date when the product was created")
    created_by: Dict = Field(title="created by author", description="user id of admin who created the product")
    assets: List[Optional[Dict]] = Field(title="asset list", description="consists of list of image assets")
    price: float = Field(title="product price", description="price of the product with upto 2 digit floating precision")
    currency: float = Field(title="price in currency", description="currency. must be either usd / can / inr / myr")
    quantity: int = Field(title="number of products", description="number of products in stock")
    
    # custom validation
    @field_validator("currency")
    def reg_type_check(cls, v):
        if not is_part_of_list(v, ['usd', 'inr', 'myr']):
            raise ValueError('value must be of type - usd | inr | myr')
        return v.title()

# for parsing
def product_response_entity(item) -> Dict:
    return {
        "product_id": item["product_id"],
        "name": item["name"],
        "description": item["description"],
        "content": item["content"],
        "created_date": item["created_date"],
        "created_by": item["created_by"],
        "assets": item["assets"],
        "price": item["price"],
        "currency": item["currency"],
        "quantity": item["quantity"],
    }

def products_response_entity(entity) -> List:
    return [product_response_entity(item) for item in entity]