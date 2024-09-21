"""
DAO layer for products table
related queries
"""
from typing import Optional, Union, List
from psycopg2.extras import RealDictRow
from api.config.db import generate_random_uuid
from models.product import ProductRequestModel
from config.db import db_instance
import psycopg2
import logging

def get_products():
    table_name = "products"
    query = f"SELECT * from {table_name}"
    return db_instance.execute_query_results(query)

def get_product_by_id(product_id: str):
    table_name = "products"
    query = f"SELECT * FROM {table_name} WHERE product_id=%s"
    logging.debug(f"Query to be executed: {query}")
    return db_instance.execute_query_results(query, [product_id])

"""
Create a record in asset_products table    
"""
def _insert_asset_product_record(asset_id: str, product_id: str):
    table_name = "asset_products" 
    columns = ["product_id", "asset_id"]
    values = [product_id, asset_id]
    insert_query = f"""
            INSERT INTO {table_name} ({','.join(columns)}) VALUES ({','.join(['%s' for _ in range(len(columns))])})
            RETURNING *
            """
    logging.debug(f"Insert query: {insert_query}")
    try:
        result: Optional[RealDictRow] = db_instance.execute_query_result(query=insert_query, params=values)
        return dict(result) if result else None
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error inserting values into table - asset_products, {}".format(str(error)))
        raise ValueError(f"Error inserting values into table - asset_products, {error}")


"""
Create a new record in products table    
"""
def _insert_product_record(products: ProductRequestModel, product_id: str) -> Optional[dict]:   
    table_name = "products" 
    columns = ["product_id", 
        "name", "description", 
        "content", "created_by", 
        "created_date", "price",
        "quantity", "currency" 
    ]
    values = [product_id, 
        products.name, products.description, 
        products.content, products.created_by,
        products.created_date, products.price,
        products.quantity, products.currency
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
        logging.error("Error inserting values into table - products, {}".format(str(error)))
        raise ValueError(f"Error inserting values into table - products, {error}")

def add_product_record(products: ProductRequestModel) -> Optional[dict]:   
    try:
        product_id = generate_random_uuid()
        logging.debug("create record in products table")
        record = _insert_product_record(products=products, product_id=product_id)
        logging.debug("for every asset id, create record in asset_products table")
        for asset in products.assets:
            _insert_asset_product_record(asset_id=asset, product_id=product_id)
        return record
    except ValueError as error:
        logging.error(str(error))
        return None

def delete_product_record_by_id(product_id: str) -> bool:
    table_name = "products"
    column = "product_id"
    delete_query = f"""
                DELETE FROM {table_name} WHERE {column} = %s
                CASCADE
                """
    logging.debug(f"{delete_query}")
    try:
        db_instance.execute_query(query=delete_query, params=[product_id])
        return True
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error deleting record from table - {}, {}".format(table_name, str(error)))
        return False
