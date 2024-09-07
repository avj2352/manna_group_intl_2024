from pydantic import BaseModel, Field, field_validator
# custom
from util.helper import is_part_of_list

class UserModel (BaseModel):
    name: str = Field(title="user name", description="name is required and must be 1-50")
    email: str = Field(title="user email", description="email is required")
    vendor: str = Field(title="oauth vendor", description="3rd party vendor - google-oauth2, facebook", default="facebook")        
    role: str = Field(title="user role", description="user role in power ministry - admin", default="admin")
    
class UserCreateModel (BaseModel):
    name: str = Field(title="user name", description="name is required and must be 1-50")
    email: str = Field(title="user email", description="email is required")
    vendor: str = Field(title="oauth vendor", description="3rd party vendor - google-oauth2, facebook", default="facebook")    
    role: str = Field(title="user role", description="user role in power ministry - admin", default="admin")
    
    # custom validation
    @field_validator("vendor")
    def reg_type_check(cls, v):
        if not is_part_of_list(v, ['google-oauth2', 'facebook']):
            raise ValueError('value must be of type - google-oauth2 | facebook')
        return v.title()
    
    
    
# Schemas is just a serializer for mongo db
# Serializer to convert from Mongo BSON to a simple JSON
# This is a 1:1 mapping between models/user.py
# Filtering of sensitive fields is done here
# find()
def user_entity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "email": item["email"],
        "vendor": item["vendor"],        
        "role": item["role"]
    }

def user_response_entity(item) -> dict:
    return {        
        "name": item["name"],
        "email": item["email"],
        "vendor": item["vendor"],        
        "role": item["role"]
    }
    
# find_all()
def users_entity(entity) -> list:
    return [user_entity(item) for item in entity]    


def users_response_entity(entity) -> list:
    return [user_response_entity(item) for item in entity]    