import logging
from fastapi import HTTPException
from typing import Optional, List
import uuid
from cachetools import cached, TTLCache
# ..custom
from util.env_config import CACHE_MAX_SIZE, CACHE_TTL, MANNA_IMAGES_BUCKET
from dao.asset import (get_asset_by_id,
    get_assets, add_asset_record, 
    update_asset_record_by_id, 
    update_asset_position_by_id, delete_asset_record_by_id
)
from models.asset import AssetModel, AssetRequestModel, AssetResponseModel
from services.s3_file import FileService


class AssetService:
    def __init__(self):        
        self.file_service = FileService()
        
    def get_assets(self) -> Optional[List[AssetResponseModel]]:
        logging.debug(f"Service: retrieving all asset records")
        records = get_assets()
        logging.debug("returned list: {records}")
        try:
            return [AssetResponseModel(
            asset_id=record.asset_id,
            position=record.position,
            asset_type=str(record.asset_type).lower(),
            description=record.description,
            asset_key=record.asset_key,
            url=self.file_service.create_presigned_url(MANNA_IMAGES_BUCKET, record.asset_key)
            ) for record in records]
        except ValueError as err:
            logging.error(f"Service - ValueError retrieving record list: {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
        except Exception as err:
            logging.error(f"Service - Error retrieving record list: {err.__class__} - {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
    
    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def get_asset_by_asset_id(self, asset_id: str) -> Optional[List[AssetResponseModel]]:
        logging.debug(f"Service: retrieving record by asset_id: {asset_id}")
        records = get_asset_by_id(asset_id=asset_id)
        try:
            return [AssetResponseModel(
            asset_id=record.asset_id,
            position=record.position,
            asset_type=str(record.asset_type).lower(),
            description=record.description,
            asset_key=record.asset_key,
            url=self.file_service.create_presigned_url(MANNA_IMAGES_BUCKET, record.asset_key)
            ) for record in records]
        except Exception as err:
            logging.error(f"Service - Error retrieving record list: {err.__class__} - {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
    
    def add_asset_record(self, asset: AssetRequestModel):
        # Step 1: retrieve existing records length
        logging.debug(f"Service: 1. retrieving current record length")
        records: Optional[List[AssetModel]] = get_assets()
        # Step 2: create new record
        logging.debug(f"Service: 1. create new record")
        position = len(records) + 1 if records else 1
        record = AssetModel(
            asset_id=str(uuid.uuid4()),
            position=position,
            asset_type=(str(asset.asset_type).lower()),
            description=asset.description,
            asset_key=asset.asset_key
        )
        return add_asset_record(record)
    
    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def update_asset_record_by_id(self, asset: AssetRequestModel, asset_id: str, position: int):        
        # Step 2: update record
        logging.debug(f"Service: update record by id: {asset_id} and position: {position}")        
        record = AssetModel(
            asset_id=asset_id,
            position=position,
            asset_type=(str(asset.asset_type).lower()),
            description=asset.description,
            asset_key=asset.asset_key
        )
        return update_asset_record_by_id(record)
    
    
    def update_asset_position_by_id(self, position: int, asset_id: str):
        logging.debug(f"Service: update record position by id: {asset_id} and position: {position}")
        return update_asset_position_by_id(position=position, asset_id=asset_id)
    
    def delete_asset_record_by_id(self, asset_id: str):
        logging.debug(f"Service: delete record by id: {asset_id}")
        return delete_asset_record_by_id(asset_id=asset_id)
    
    