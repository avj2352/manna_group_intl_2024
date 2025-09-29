"""
DAO layer for promotions table
related queries
"""
from typing import Optional, List
import logging
from sqlalchemy.orm import Session, sessionmaker
# ..custom
from dao.sql_alchemy_models import (Promotion, get_connection)
from models.promotion import PromotionModel
from exceptions.custom_exceptions import PromoDAOException


# init session class
engine = get_connection()

def get_promotions() -> List[PromotionModel]:
    """
        Fetch all records
        from promotions table
    """
    results = []
    logging.info("DAO -> Querying promotions")
    session = Session()
    try:
        with Session(engine) as session:
            promos: List[Promotion] = session.query(Promotion).all()
            for item in promos:
                results.append(PromotionModel(
                  promotion_id = item.promotion_id,
                  name = item.name,
                  description = item.description,
                  start_date = item.start_date,
                  end_date = item.end_date,
                  percentage = item.percentage  
                ))
            return results
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise PromoDAOException("PromotionDAO Error! error reading records from promotions table")        
        

            

def get_promotion_by_id(promotion_id: str) -> Optional[PromotionModel]:
    """
        Fetch record from
        promotions table
        where promotion_id equals promotion_id
    """
    logging.info(f"DAO -> get record from prommotion table where promotion_id is: {promotion_id}")
    try:
        with Session(engine) as session:
            record: Optional[Promotion] = session.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
            if record is None:
                logging.debug(f"No record found for promotion_id: {promotion_id}")
                return None
            return PromotionModel(**record)
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise PromoDAOException("PromotionDAO Error! error reading record from assets table")
        

def get_promotion_by_name(promo_name: str) -> Optional[PromotionModel]:
    """
        Fetch record from
        promotions table
        where name equals promo_name
    """
    logging.info(f"DAO -> get record from prommotion table where name is: {promo_name}")
    try:
        with Session(engine) as session:
            record: Optional[Promotion] = session.query(Promotion).filter(Promotion.name == promo_name).first()
            if record is None:
                logging.debug(f"No record found with name: {promo_name}")
                return None
            return PromotionModel(**record)
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise PromoDAOException("PromotionDAO Error! error reading record from assets table")

    
def add_promotion_record(promo: PromotionModel) -> bool:
    """
        Add a new record
        to products table
        True -> record added, success
        False -> error adding record to products table
    """
    logging.info("DAO -> Add a new record to promotions table")
    Session = sessionmaker(bind=engine)
    session = Session()
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
        return True
    except Exception as err:
        logging.error(f"PromotionDAO: Error adding new record - {err.__class__} - {err}")
        return False
    finally:
        session.close()

def update_promotion_record_by_id(promotion: PromotionModel, promotion_id: str) -> bool:
    """
        Update promotion record
        details by id
        True -> record updated, success
        False -> error updating promotion record
    """   
    logging.info(f"DAO -> updating promotion record by id: {promotion_id}")
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        record: Optional[Promotion] = session.query(Promotion)\
                                        .filter(Promotion.promotion_id == promotion_id).first()
        if record is None:
            logging.error(f"PromotionDAO -> Error updating record: no record found with id: {promotion_id}")
            return False
        record.promotion_id  = promotion.promotion_id,
        record.name = promotion.name,
        record.description = promotion.description,
        record.start_date = promotion.start_date,
        record.end_date = promotion.end_date,
        record.percentage = promotion.percentage
        session.commit()
        logging.info(f"Updated promotion record with id: {promotion_id}")
        return True
    except Exception as err:
        session.rollback()
        logging.error(f"PromotionDAO -> Error updating record: {err.__class__} - {str(err)}")
        return False
    finally:
        session.close()    

def delete_promotion_record_by_id(promotion_id: str) -> bool:
    """
        delete promotion record by id
        if record found, delete -> returns True
        for all else -> returns False
    """
    logging.info(f"DAO -> delete promotion record by id: {promotion_id}")
    try:
        with Session(engine) as session:
            record: Optional[Promotion] = session.query(Promotion)\
                                            .filter(Promotion.promotion_id == promotion_id).first()
            if not record:
                return False
            session.delete(record)
            session.commit()
            return True
    except Exception as err:
        logging.error(f"PromotionDAO ->  Error deleting promotion record: {err.__class__} - {str(err)}")                                    
        return False
