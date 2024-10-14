"""
Model for creating assets
"""
from pydantic import BaseModel, Field, field_validator
from typing import List, Dict, Optional
# custom
from util.helper import is_part_of_list


class AssetModel(BaseModel):
    asset_id: str = Field(title="asset id", description="asset id is required")
    position: int = Field(title="asset position", description="position is required and must be 1-50")
    asset_type: str = Field(title="asset type", description="asset type - gallery / product / other")
    description: str = Field(title="asset description", description="description of the asset")
    asset_key: str = Field(title="image s3 key", description="link to the image in s3 bucket")    
    
    # custom validation
    @field_validator("asset_type")
    def reg_type_check(cls, v):
        if not is_part_of_list(v, ['gallery', 'product', 'other']):
            raise ValueError('value must be of type - gallery | product | other')
        return v.title()
    
class AssetRequestModel(BaseModel):
    asset_type: str = Field(title="asset type", description="asset type - gallery / product / other")
    description: str = Field(title="asset description", description="description of the asset")
    asset_key: str = Field(title="image s3 key", description="link to the image in s3 bucket")    
    
    # custom validation
    @field_validator("asset_type")
    def reg_type_check(cls, v):
        if not is_part_of_list(v, ['gallery', 'product', 'other']):
            raise ValueError('value must be of type - gallery | product | other')
        return v.title()


# for parsing
def asset_response_entity(item) -> Dict:
    return {
        "asset_id": item["asset_id"],
        "position": item["position"],
        "asset_type": item["asset_type"],
        "description": item["description"],
        "asset_key": item["asset_key"]        
    }

def assets_response_entity(entity) -> List:
    return [asset_response_entity(item) for item in entity]