"""
DAO layer for assets table
related queries
"""
from typing import Optional, List
import logging
from sqlalchemy.orm import Session, sessionmaker
# custom
from dao.sql_alchemy_models import (Asset, get_connection)
from models.asset import AssetModel
from exceptions.custom_exceptions import AssetDAOException


# init session class
engine = get_connection()


def get_assets() -> List:
    """
        Fetch all records
        from assets table
    """
    logging.debug("DAO -> get all assets")
    try:
        with Session(engine) as session:
            assets = session.query(Asset).all()
            return assets
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise AssetDAOException("AssetDAO Error! error reading records from assets table")        

def get_asset_by_id(asset_id: str) -> Optional[Asset]:
    """
        Fetch all records
        from assets table
        where asset_id equals asset_id
    """
    logging.debug(f"DAO -> get all assets with asset_id: {asset_id}")
    try:
        with Session(engine) as session:
            record: Optional[Asset] = session.query(Asset).filter(Asset.asset_id == asset_id).first()
            if record is None:
                logging.debug(f"No record found for asset_id: {asset_id}")
                return None
            return record
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise AssetDAOException("AssetDAO Error! error reading record from assets table")      

def add_asset_record(record: AssetModel) -> bool:
    """
        Add new record
        True ->  record added, success
        False -> record was not added, error
    """
    logging.info(f"DAO -> adding new record: {record}")
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        asset_record = Asset(
            asset_id = record.asset_id,
            position = record.position,
            asset_type = record.asset_type,
            description = record.description,
            asset_key = record.asset_key
        )
        session.add(asset_record)
        session.commit()
        logging.info(f"Asset record added to table: {asset_record}")
        return True      
    except Exception as err:
        logging.error(f"Error creating asset record: {err.__class__} - {str(err)}")
        session.rollback()
        return False
    finally:
        session.close()
    
def update_asset_record_by_id(record: AssetModel, asset_id: str) -> bool:
    """
        Update asset record
        details by id
        True -> record updated, success
        False -> record was not updated, error
    """
    logging.info(f"DAO ->  updating asset record by id: {asset_id}")
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        asset_to_update: Optional[Asset] = session.query(Asset)\
                                        .filter(Asset.asset_id == asset_id).first()
        if asset_to_update is None:
            logging.error(f"Error updating asset record: no record found with id: {asset_id}")
            return False
        asset_to_update.asset_id = record.asset_id
        asset_to_update.position = record.position
        asset_to_update.asset_type = record.asset_type
        asset_to_update.description = record.description
        asset_to_update.asset_key = record.asset_key

        session.commit()
        logging.info(f"Updated asset record with id: {asset_id}")
        return True
    except Exception as err:
        session.rollback()
        logging.error(f"Error updating asset record: {err.__class__} - {str(err)}")
        return False
    finally:
        session.close()

def update_asset_position_by_id(position: int, asset_id: str) -> bool:   
    """
        Update asset record
        position by id
        True -> record updated, success
        False -> record was not updated, error
    """
    logging.info(f"DAO ->  updating asset position by id: {asset_id}")
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        asset_to_update: Optional[Asset] = session.query(Asset).filter(Asset.asset_id == asset_id).first()
        if asset_to_update is None:
            logging.error(f"Error updating asset record position: no record found with id: {asset_id}")
            return False
        asset_to_update.position = position

        session.commit()
        logging.info(f"Updated asset record position for id: {asset_id}")
        return True
    except Exception as err:
        session.rollback()
        logging.error(f"Error updating asset record position: {err.__class__} - {str(err)}")
        return False
    finally:
        session.close()

    
def delete_asset_record_by_id(asset_id: str) -> bool:
    """
        delete asset record by id
        if record found, deletes -> returns True
        for all else -> returns False
    """
    logging.debug(f"DAO -> delete asset record by id: {asset_id}")
    try:
        with Session(engine) as session:
            record: Optional[Asset] = session.query(Asset).filter_by(asset_id=asset_id).first()
            if not record:
                return False
            session.delete(record)
            # commit delete
            session.commit()
            return True
    except Exception as err:
        logging.error(f"Error deleting asset record: {err.__class__} - {str(err)}")
        return False
