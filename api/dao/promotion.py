"""
DAO layer for promotions table
related queries
"""
from fastapi import HTTPException
from typing import Optional, List, Dict
from sqlalchemy import update, delete
from models.promotion import PromotionModel
from dao.sql.sql_alchemy_models import Promotion
from config.db import Session
import logging

def get_promotions() -> List:
    result = []
    logging.info("DAO: Querying promotions")
    session = Session()
    try:
        promotions = session.query(Promotion).all()
        for item in promotions:
            result.append(PromotionModel(
                promotion_id=item.promotion_id,
                name=item.name,
                description=item.description,                
                start_date=item.start_date,
                end_date=item.end_date,
                percentage=item.percentage
            ))
        return result
    except Exception as err:
        logging.error(f"DAO: Error querying SQL alchemy {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")  
    finally:
        session.close()
        

def get_promotion_by_id(promotion_id: str) -> List:
    logging.info("DAO: Querying promotions by promotion_id")
    result = []
    session = Session()
    try:
        promotions = session.query(Promotion).filter_by(promotion_id=promotion_id).all()
        for item in promotions:
            result.append(PromotionModel(
                promotion_id=item.promotion_id,
                name=item.name,
                description=item.description,                
                start_date=item.start_date,
                end_date=item.end_date,
                percentage=item.percentage
            ))
        return result
    except Exception as err:
        logging.error(f"DAO: Error query SQL alchemy {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def get_promotion_by_name(promo_name: str) -> List:
    logging.info("DAO: Querying promotions by name")    
    result =[]
    session = Session()
    try:
        promotions = session.query(Promotion).filter_by(name=promo_name).all()
        for item in promotions:
            result.append(PromotionModel(
                promotion_id=item.promotion_id,
                name=item.name,
                description=item.description,                
                start_date=item.start_date,
                end_date=item.end_date,
                percentage=item.percentage
            ))
        return result        
    except Exception as err:
        logging.error(f"DAO: Error querying SQL alchemy by promo name {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def add_promotion_record(promo: PromotionModel) -> Optional[str]:
    session = Session()
    logging.info("DAO: Add a new record")
    try:
        record = Promotion(
            promotion_id=promo.promotion_id,
            name=promo.name,
            description=promo.description,                
            start_date=promo.start_date,
            end_date=promo.end_date,
            percentage=promo.percentage
        )
        session.add(record)
        session.commit()
        return f"Added new record - {record.promotion_id}"
    except Exception as err:
        logging.error(f"DAO: Error adding new record - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def update_promotion_record_by_id(promotions: PromotionModel, promotion_id: str) -> Optional[str]:   
    logging.debug(f"DAO: update record by id - {promotion_id} ")
    session = Session()
    try:
        stmt = (update(Promotion).\
            where(Promotion.promotion_id == promotion_id).\
            values(
                promotion_id=promotions.promotion_id,
                name=promotions.name,
                description=promotions.description,                
                start_date=promotions.start_date,
                end_date=promotions.end_date,
                percentage=promotions.percentage
            )
        )
        session.execute(stmt)
        session.commit()
        return f"Updated record by id: {promotion_id}"
    except Exception as err:
        logging.error(f"DAO: Error updating record by id: {promotion_id} - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()
    

def delete_promotion_record_by_id(promotion_id: str) -> Optional[str]:
    logging.debug(f"DAO: update record position by id - {promotion_id} ")
    session = Session()
    try:
        stmt = (delete(Promotion).\
            where(Promotion.promotion_id == promotion_id)            
            )
        session.execute(stmt)
        session.commit()
        return f"Deleted promotion record: {promotion_id}"
    except Exception as err:
        logging.error(f"DAO: Error updating record by id: {promotion_id} - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()