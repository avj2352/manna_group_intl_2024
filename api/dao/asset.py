"""
DAO layer for assets table
related queries
"""
from typing import Optional
from psycopg2.extras import RealDictRow
from api.config.db import generate_random_uuid
from models.asset import AssetModel
from config.db import db_instance
import psycopg2
import logging

def get_assets():
    table_name = "assets"
    query = f"SELECT * from {table_name}"
    return db_instance.execute_query_results(query)

def get_asset_by_id(asset_id: str):
    table_name = "assets"
    query = f"SELECT * FROM {table_name} WHERE asset_id=%s"
    logging.debug(f"Query to be executed: {query}")
    return db_instance.execute_query_results(query, [asset_id])

"""
Create a new record in assets table    
"""
def _insert_asset_record(assets: AssetModel, asset_id: str) -> Optional[dict]:   
    table_name = "assets" 
    columns = ["asset_id", 
        "position", "type", 
        "description", "link",         
    ]
    values = [asset_id, 
        assets.position, assets.type, 
        assets.description, assets.link,                
    ]
    insert_query = f"""
            INSERT INTO {table_name} ({','.join(columns)}) VALUES ({','.join(['%s' for _ in range(len(columns))])})
            RETURNING *
            """
    logging.debug(f"Insert query: {insert_query}")
    try:
        result: Optional[RealDictRow] = db_instance.execute_query_result(query=insert_query, params=values)
        return dict(result) if result else None
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error inserting values into table - assets, {}".format(str(error)))
        raise ValueError(f"Error inserting values into table - assets, {error}")

def add_asset_record(assets: AssetModel) -> Optional[dict]:   
    try:
        asset_id = generate_random_uuid()
        logging.debug("create record in assets table")
        return _insert_asset_record(assets=assets, asset_id=asset_id)
    except ValueError as error:
        logging.error(str(error))
        return None

def update_asset_record_by_id(assets: AssetModel, asset_id: str) -> Optional[dict]:   
    logging.debug(f"assets: update record by id - {asset_id} ")
    table_name = "assets" 
    
    columns = [
        "position", "type", 
        "description", "link",         
        ]
    
    values = [ 
        assets.position, assets.type, 
        assets.description, assets.link,                
        ]
    
    update_query = f"""
            UPDATE {table_name} SET {','.join([f'{col} = %s' for col in columns])}
            WHERE asset_id = %s
            RETURNING *
    """
    
    logging.debug(f"{update_query}")
    
    try:   
        params = values + [asset_id]
        result: Optional[RealDictRow] = db_instance.execute_query_result(query=update_query, params=params)
        return dict(result) if result else None
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error updating values into table - assets, {}".format(str(error)))
        return None

def update_asset_position_by_id(position: int, asset_id: str) -> Optional[dict]:   
    logging.debug(f"assets: update record position to {position} by id - {asset_id} ")
    table_name = "assets" 
    
    columns = ["position"]
    
    values = [position]
    
    update_query = f"""
            UPDATE {table_name} SET {','.join([f'{col} = %s' for col in columns])}
            WHERE asset_id = %s
            RETURNING *
    """
    
    logging.debug(f"{update_query}")
    
    try:   
        params = values + [asset_id]
        
        result: Optional[RealDictRow] = db_instance.execute_query_result(query=update_query, params=params)
        return dict(result) if result else None
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error updating positions into table - assets, {}".format(str(error)))
        return None

def delete_asset_record_by_id(asset_id: str) -> bool:
    table_name = "assets"
    column = "asset_id"
    delete_query = f"""
                DELETE FROM {table_name} WHERE {column} = %s
                CASCADE
                """
    logging.debug(f"{delete_query}")
    try:
        db_instance.execute_query(query=delete_query, params=[asset_id])
        return True
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error deleting record from table - {}, {}".format(table_name, str(error)))
        return False
