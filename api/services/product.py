import logging
from fastapi import HTTPException
from typing import Optional, List
import uuid
from cachetools import cached, TTLCache
# ..custom
from util.env_config import CACHE_MAX_SIZE, CACHE_TTL, MANNA_IMAGES_BUCKET
from util.helper import get_current_timestamp
from dao.product import (get_products,
    get_product_by_id, add_product_record, 
    delete_product_by_id,     
)
from models.product import ProductModel, ProductRequestModel, ProductResponseModel
from services.s3_file import FileService


class ProductService:
    def __init__(self):        
        self.file_service = FileService()
        
    def get_products(self) -> List[ProductResponseModel]:
        logging.debug(f"Service: retrieving all product records")
        records = get_products()
        logging.debug("returned list: {records}")
        try:
            return [ProductResponseModel(
                product_id=record.product_id,
                name=record.name,
                description=record.description,
                content=record.content,
                created_date=record.created_date,                
                assets=record.assets,
                price=record.price,
                currency=str(record.currency).lower(),
                quantity=record.quantity
            ) for record in records]
        except ValueError as err:
            logging.error(f"Service - ValueError retrieving record list: {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
        except Exception as err:
            logging.error(f"Service - Error retrieving record list: {err.__class__} - {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
    
    def _append_url_to_asset_list(self, asset_list: List) -> List:
        if asset_list is None:
            return []
        filtered_list = [x for x in asset_list if x is not None and hasattr(x, 'asset_key')]
        return [{
            **item, 
            "url": self.file_service.create_presigned_url(MANNA_IMAGES_BUCKET, item.asset_key)
        } for item in filtered_list]
            
    
    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def get_product_by_id(self, product_id: str) -> Optional[ProductResponseModel]:
        logging.debug(f"Service: retrieving record by product_id: {product_id}")
        try:
            record: Optional[ProductModel] = get_product_by_id(product_id=product_id)
            if not record:
                return None        
            return ProductResponseModel(
            product_id=record.product_id,
                name=record.name,
                description=record.description,
                content=record.content,
                created_date=record.created_date,                
                assets=self._append_url_to_asset_list(record.assets),
                price=record.price,
                currency=record.currency,
                quantity=record.quantity
            )
        except Exception as err:
            logging.error(f"Service - Error retrieving record list: {err.__class__} - {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
    
    def add_product_record(self, product: ProductRequestModel, user_id: str):                        
        # create new record
        logging.debug(f"Service: create new record")        
        new_record = ProductModel(
            product_id=str(uuid.uuid4()),            
            name=product.name,
            description=product.description,
            content=product.content,
            assets=product.assets,
            created_by=user_id,
            created_date=get_current_timestamp(),
            price=product.price,
            currency=str(product.currency).lower(),
            quantity=product.quantity
        )
        return add_product_record(new_record)
    
    
    def delete_product_record_by_id(self, product_id: str):
        logging.debug(f"Service: delete record by id: {product_id}")
        return delete_product_by_id(product_id=product_id)
    
    
