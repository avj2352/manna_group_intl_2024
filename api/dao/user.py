"""
DAO layer for users table
related queries
"""
from typing import Union, List
from psycopg2.extras import RealDictRow
from models.user import UserCreateModel
from config.db import db_instance
import psycopg2
import logging

def get_users():
    table_name = "users"
    query = f"SELECT * from {table_name}"
    return db_instance.execute_query_results(query)

def get_by_user_email(email: str):
    table_name = "users"
    query = f"SELECT * FROM {table_name} WHERE email=%s"
    logging.debug(f"Query to be executed: {query}")
    return db_instance.execute_query_results(query, [email])

def add_user_record(users: UserCreateModel) -> Union[dict, None]:   
    table_name = "users" 
    columns = ["name", "email", "vendor"]
    values = [users.name, users.email, users.vendor]
    insert_query = f"""
            INSERT INTO {table_name} ({','.join(columns)}) VALUES ({','.join(['%s' for _ in range(len(columns))])})
            RETURNING *
            """
    logging.debug(f"Insert query: {insert_query}")
    try:
        result: Union[RealDictRow, None] = db_instance.execute_query_result(query=insert_query, params=values)
        return dict(result) if result else None
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("Error inserting values into table = users, {}".format(str(error)))
        return None

def delete_user_record_by_email(email: str) -> bool:
    table_name = "users"
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