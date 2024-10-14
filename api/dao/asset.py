"""
DAO layer for assets table
related queries
"""
from fastapi import HTTPException
from typing import Optional, List
from sqlalchemy import update, delete
from models.asset import AssetModel
from dao.sql.sql_alchemy_models import Asset
from config.db import Session
import logging

def get_assets() -> List:
    result = []
    logging.info("DAO: Querying assets")
    session = Session()
    try:
        assets = session.query(Asset).all()
        for item in assets:
            result.append(AssetModel(
                asset_id=item.asset_id,
                position=item.position,
                asset_type=item.asset_type,
                description=item.description,
                asset_key=item.asset_key
            ))
        return result
    except Exception as err:
        logging.error(f"DAO: Error querying SQL alchemy {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")  
    finally:
        session.close()
        

def get_asset_by_id(asset_id: str) -> List:
    logging.info("DAO: Querying assets by asset_id")
    result = []
    session = Session()
    try:
        assets = session.query(Asset).filter_by(asset_id=asset_id).all()
        for item in assets:
            result.append(AssetModel(
                asset_id=item.asset_id,
                position=item.position,
                asset_type=item.asset_type,
                description=item.description,
                asset_key=item.asset_key
            ))
        return result
    except Exception as err:
        logging.error(f"DAO: Error query SQL alchemy {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def add_asset_record(assets: AssetModel) -> Optional[str]:
    session = Session()
    logging.info("DAO: Add a new record")
    try:
        record = Asset(
            asset_id=assets.asset_id,
            position=assets.position,
            asset_type=assets.asset_type,
            description=assets.description,
            asset_key=assets.asset_key)
        session.add(record)
        session.commit()
        return f"Added new record - {assets.asset_id}"
    except Exception as err:
        logging.error(f"DAO: Error adding new record - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def update_asset_record_by_id(assets: AssetModel, asset_id: str) -> Optional[str]:   
    logging.debug(f"DAO: update record by id - {asset_id} ")
    session = Session()
    try:
        stmt = (update(Asset).\
            where(Asset.asset_id == asset_id).\
            values(position = assets.position,
                   asset_type = assets.asset_type,
                   description = assets.description,
                   asset_key = assets.asset_key)
            )
        session.execute(stmt)
        session.commit()
        return f"Updated record by id: {asset_id}"
    except Exception as err:
        logging.error(f"DAO: Error updating record by id: {asset_id} - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()
    

def update_asset_position_by_id(position: int, asset_id: str) -> Optional[str]:   
    logging.debug(f"DAO: update record position by id - {asset_id} ")
    session = Session()
    try:
        stmt = (update(Asset).\
            where(Asset.asset_id == asset_id).\
            values(position = position)
            )
        session.execute(stmt)
        session.commit()
        return f"Updated record by id: {asset_id}"
    except Exception as err:
        logging.error(f"DAO: Error updating record by id: {asset_id} - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def delete_asset_record_by_id(asset_id: str) -> Optional[str]:
    logging.debug(f"DAO: update record position by id - {asset_id} ")
    session = Session()
    try:
        stmt = (delete(Asset).\
            where(Asset.asset_id == asset_id)            
            )
        session.execute(stmt)
        session.commit()
        return f"Deleted asset record: {asset_id}"
    except Exception as err:
        logging.error(f"DAO: Error updating record by id: {asset_id} - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()