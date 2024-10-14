"""
About the application
"""
from fastapi.security import HTTPBasic
from pydantic_settings import BaseSettings
from typing import List, Any

API_VERSION: str = "0.5.3"

description: str = f"""
This API microservice serves as an e-commerce system & content management system 
for Manna Group International web application

You can access the website at <b><a href="https://mannagroupintl.com" target="_blank">
Manna Group International Website</a></b>
"""

class GlobalConfig(BaseSettings):
    """
    Global configuration for environment
    """
    tags_metadata: List[Any]  = [
        {
            "name": "Manna Group Intl API",
            "description": "Manna Group International E-commerce API"
        },
    ]
    title: str = "Manna Group Intl API"
    version: str = API_VERSION    

config = GlobalConfig()
security = HTTPBasic()
