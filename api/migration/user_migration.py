"""
contains migration scripts for
users entity / table
"""
import logging
from config.db import db_instance

# check if table already exists
def _check_table_exists() -> bool:
    table_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'users'
        )
    """)
    logging.debug(f"result is: {result}")
    if result is not None:
        logging.debug(f"result is: {result}")
        table_exists = result['exists']  # Fetch the boolean result

    return table_exists

# safe way to delete table
def _drop_table():
    logging.info(f"..drop users if exists")
    db_instance.execute_query(f"""
            DROP TABLE IF EXISTS users CASCADE;
            """)

# create users table
def _create_table():
    db_instance.execute_query(f"""
        CREATE TABLE IF NOT EXISTS users (
            "_id" SERIAL UNIQUE PRIMARY KEY,
            "user_id" VARCHAR UNIQUE NOT NULL,
            "name" VARCHAR UNIQUE NOT NULL,
            "email" VARCHAR UNIQUE NOT NULL,
            "vendor" VARCHAR NOT NULL            
        );
        """)



def init():
    # Step 1.a: DROP Table - users
    # _drop_table()
    # Step 1.b: Check if users table exists
    # logging.info("1. check if users table exists -> {}".format(_check_table_exists()))

    # Step 2: Create users table
    # _create_table()
    # Step 2.b: Check if users table exists
    logging.info("2.b. check if users table exists -> {}".format(_check_table_exists()))     
    # pass  

# if need to run independently
if __name__ == "__main__":
    init()
