import logging
from fastapi import HTTPException
from typing import Optional, List
import uuid
from cachetools import cached, TTLCache
# ..custom
from util.env_config import CACHE_MAX_SIZE, CACHE_TTL
from dao.promotion import (
    get_promotion_by_id,
    get_promotion_by_name,
    get_promotions,
    add_promotion_record,
    update_promotion_record_by_id,
    delete_promotion_record_by_id,
)
from models.promotion import PromotionModel, PromotionRequestModel, PromoQueryResponseModel


class PromotionService:            
        
    def get_promotions(self) -> Optional[List[PromotionModel]]:
        logging.debug(f"Service: retrieving all promotion records")        
        try:
            records = get_promotions()
            logging.debug(f"returned list: {records}")
            return [PromotionModel(
                promotion_id=record.promotion_id,
                name=record.name,
                description=record.description,
                start_date=record.start_date,
                end_date=record.end_date,
                percentage=record.percentage            
            ) for record in records]
        except ValueError as err:
            logging.error(f"Service - ValueError retrieving record list: {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
        except Exception as err:
            logging.error(f"Service - Error retrieving record list: {err.__class__} - {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
    
    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def get_promotion_by_id(self, promo_id: str) -> Optional[List[PromotionModel]]:
        logging.debug(f"Service: retrieving record by promotion id: {promo_id}")
        try:
            records = get_promotion_by_id(promotion_id=promo_id)
            return [PromotionModel(
                promotion_id=record.promotion_id,
                name=record.name,
                description=record.description,
                start_date=record.start_date,
                end_date=record.end_date,
                percentage=record.percentage 
            ) for record in records]
        except Exception as err:
            logging.error(f"Service - Error retrieving record list: {err.__class__} - {err}")
            return HTTPException(status_code=500, detail="Error retrieving record list")
        
    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def get_promotion_by_name(self, promo_name: str) -> PromoQueryResponseModel:
        logging.debug(f"Service: retrieving record by promo name: {promo_name}")
        try:
            records = get_promotion_by_name(promo_name=promo_name)
            if len(records) == 0:
                return PromoQueryResponseModel(
                    validity=False,
                    message="No promotions found",
                    details=None
                )
            elif len(records) > 0:
               record = records[0]
               return PromoQueryResponseModel(
                   validity=True,
                   message="promotion found",
                   details=PromotionRequestModel(
                        name=str(record.name).lower(),
                        description=record.description,
                        start_date=record.start_date,
                        end_date=record.end_date,
                        percentage=record.percentage
                    )
               )            
        except Exception as err:
            logging.error(f"Service - Error retrieving record list for promotion query by name: {err.__class__} - {err}")
            return PromoQueryResponseModel(
                    validity=False,
                    message="No promotions found",
                    details=None
            )
    
    def add_promo_record(self, promo_record: PromotionRequestModel):        
        # Step 2: create new record
        record = PromotionModel(
            promotion_id=str(uuid.uuid4()),
            name=promo_record.name,
            description=promo_record.description,
            start_date=promo_record.start_date,
            end_date=promo_record.end_date,
            percentage=int(promo_record.percentage)
        )
        logging.debug(f"Service: create new record: {record}")                
        return add_promotion_record(promo=record)
    
    
    def update_promo_by_id(self, promo_record: PromotionRequestModel, promo_id: str):        
        logging.debug(f"Service: update record by id: {promo_id}")     
        # Step 2: update record        
        record = PromotionModel(
            promotion_id=promo_id,
            name=promo_record.name,
            description=promo_record.description,
            start_date=promo_record.start_date,
            end_date=promo_record.end_date,
            percentage=int(promo_record.percentage)
        )           
        return update_promotion_record_by_id(promotions=record, promotion_id=promo_id)
    
        
    
    def delete_promo_by_id(self, promo_id: str):
        logging.debug(f"Service: delete record by id: {promo_id}")
        return delete_promotion_record_by_id(promotion_id=promo_id)
    
    
