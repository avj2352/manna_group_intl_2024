"""
DAO layer for products table
related queries
"""
from typing import Union, List
from psycopg2.extras import RealDictRow
from models.user import UserCreateModel
from config.db import db_instance
import psycopg2
import logging

def get_products():
    table_name = "products"
    query = f"SELECT * from {table_name}"
    return db_instance.execute_query_results(query)

def get_by_product_by_id(id: str):
    table_name = "products"
    query = f"SELECT * FROM {table_name} WHERE _id=%s"
    logging.debug(f"Query to be executed: {query}")
    return db_instance.execute_query_results(query, [email])

def add_user_record(products: UserCreateModel) -> Union[dict, None]:   
    table_name = "products" 
    columns = ["name", "email", "vendor"]
    values = [products.name, products.email, products.vendor]
    insert_query = f"""
            INSERT INTO {table_name} ({','.join(columns)}) VALUES ({','.join(['%s' for _ in range(len(columns))])})
            RETURNING *
            """
    logging.debug(f"Insert query: {insert_query}")
    try:
        result: Union[RealDictRow, None] = db_instance.execute_query_result(query=insert_query, params=values)
        return dict(result) if result else None
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error inserting values into table = products, {}".format(str(error)))
        return None

def delete_user_record_by_email(email: str) -> bool:
    table_name = "products"
    column = "email"
    delete_query = f"""
                DELETE FROM {table_name} WHERE {column} = %s
                """
    logging.debug(f"{delete_query}")
    try:
        db_instance.execute_query(query=delete_query, params=[id])
        return True
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error deleting record from table - {}, {}".format(table_name, str(error)))
        return False