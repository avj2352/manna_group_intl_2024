import logging
from typing import Optional, List
import uuid
from dao.asset import get_asset_by_id,\
    get_assets, add_asset_record, \
    update_asset_record_by_id, \
    update_asset_position_by_id, delete_asset_record_by_id
from models.asset import AssetModel, AssetRequestModel


class AssetService:
    def __init__(self):
        logging.debug(f"Initialized AssetService")
    
    def get_assets(self) -> Optional[List[AssetModel]]:
        logging.debug(f"Service: retrieving all asset records")
        return get_assets()
    
    def get_asset_by_asset_id(self, asset_id: str) -> Optional[List[AssetModel]]:
        logging.debug(f"Service: retrieving record by asset_id: {asset_id}")
        return get_asset_by_id(asset_id=asset_id)
    
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
    
    