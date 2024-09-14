"""
contains migration scripts for
order_products entity / table
"""
import logging
from config.db import db_instance

# check if table already exists
def _check_table_exists() -> bool:
    table_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'order_products'
        )
    """)
    logging.debug(f"result is: {result}")
    if result is not None:
        logging.debug(f"result is: {result}")
        table_exists = result['exists']  # Fetch the boolean result

    return table_exists

# safe way to delete table
def _drop_table():
    logging.info(f"..drop order_products if exists")
    db_instance.execute_query(f"""
            DROP TABLE IF EXISTS order_products CASCADE;
            """)

# create order_products table
def _create_table():
    db_instance.execute_query(f"""
        CREATE TABLE IF NOT EXISTS order_products (
            "_id" SERIAL UNIQUE PRIMARY KEY,
            "order_id" VARCHAR NOT NULL,
            "product_id" VARCHAR NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(order_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id) 
        );
        """)



def init():
    # Step 1.a: DROP Table - order_products
    # _drop_table()
    # Step 1.b: Check if order_products table exists
    # logging.info("1. check if order_products table exists -> {}".format(_check_table_exists()))

    # Step 2: Create order_products table
    # _create_table()
    # Step 2.b: Check if order_products table exists
    logging.info("2.b. check if order_products table exists -> {}".format(_check_table_exists()))     

# if need to run independently
if __name__ == "__main__":
    init()
