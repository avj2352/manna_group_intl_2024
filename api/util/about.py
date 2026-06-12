"""
About the application
"""
from fastapi.security import HTTPBasic
from pydantic_settings import BaseSettings
from typing import List, Any

API_VERSION: str = "2.5.1"

description: str = f"""
<p>
    This API microservice serves as an e-commerce system & content management system 
    for Manna Group International web application
</p>
<p>
    You can access the website at <b><a href="https://mannagroupintl.com" target="_blank">
    Manna Group International Website</a></b>
</p>
<p>
    version: <b>{API_VERSION}</b>
</p>
"""

class GlobalConfig(BaseSettings):
    """
    Global configuration for environment
    """
    tags_metadata: List[Any]  = [        
        {
            "name": "authentication",
            "description": "Consists of API collection to authenticate & authorize users",
        },
        {
            "name": "assets",
            "description": "Consists of API collection to create, update, read & delete assets",
        },
        {
            "name": "products",
            "description": "Consists of API collection to create, update, read & delete products",
        },
        {
            "name": "promotions",
            "description": "Consists of API collection to create, update, read & delete promotions",
        },
        {
            "name": "s3",
            "description": "Consists of API collection to create, update, read & delete files on Manna website",
        },
        {
            "name": "orders",
            "description": "Consists of API collection to create Stripe payment intents, confirm payments, and manage orders",
        }
    ]
    title: str = "Manna Group Intl API"
    version: str = API_VERSION    

config = GlobalConfig()
security = HTTPBasic()
