"""
contains migration scripts for
orders entity / table
"""
import logging
from config.db import db_instance

# check if table already exists
def _check_table_exists() -> bool:
    table_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'orders'
        )
    """)
    logging.debug(f"result is: {result}")
    if result is not None:
        logging.debug(f"result is: {result}")
        table_exists = result['exists']  # Fetch the boolean result

    return table_exists

# check if table already exists
def _check_search_column_exists() -> bool:
    col_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'public'  -- Optional for PostgreSQL
              AND table_name = 'orders'
              AND column_name = 'search'
        );
    """)

    if result is not None:
        col_exists = result['exists']  # Fetch the boolean result
    return col_exists

# safe way to delete table
def _drop_table():
    logging.info(f"..drop orders if exists")
    db_instance.execute_query(f"""
            DROP TABLE IF EXISTS orders CASCADE;
            """)

# create orders table
def _create_table():
    db_instance.execute_query(f"""
        CREATE TABLE IF NOT EXISTS orders (
            "_id" SERIAL UNIQUE PRIMARY KEY,
            "order_id" VARCHAR UNIQUE NOT NULL,
            "name" VARCHAR NOT NULL,
            "email" VARCHAR NOT NULL,
            "stripe_invoice" VARCHAR NOT NULL,
            "total_amount" NUMERIC(7, 2) NOT NULL,
            "order_date" TIMESTAMP WITH TIME ZONE,
            "order_type" VARCHAR NOT NULL,
            "order_status" VARCHAR NOT NULL,            
            "shipping_address" VARCHAR NOT NULL,
            "billing_address" VARCHAR NOT NULL
        );
        """)

def _add_search_column():
    db_instance.execute_query(f"""
        ALTER TABLE orders
            ADD search tsvector
            GENERATED ALWAYS AS (
                setweight(to_tsvector('english', name), 'A') || ' ' ||
                setweight(to_tsvector('english', email), 'B') || ' ' ||
                setweight(to_tsvector('english', stripe_invoice), 'C') || ' ' ||
                setweight(to_tsvector('english', shipping_address), 'D') || ' ' ||
                setweight(to_tsvector('english', billing_address), 'E') :: tsvector
            ) STORED
        """)

def _create_orders_search_idx():
    logging.info("4. create index - order_search_idx")
    db_instance.execute_query(f"""
        create index order_search_idx on orders using GIN(search);;
        """)

def _drop_orders_search_fn():
    logging.info("5.a: drop order_search_fn")
    db_instance.execute_query("""
        DROP FUNCTION order_search_fn(term text)
        """)

def _create_orders_search_fn():
    logging.info("5. create order_search_fn")
    db_instance.execute_query(f"""
        CREATE OR REPLACE FUNCTION order_search_fn(term text)
        RETURNS TABLE(
            "order_id" VARCHAR,
            "name" text,
            "email" text,
            "stripe_invoice" text,
            "shipping_address" text,
            "billing_address" text,
            "rank" REAL
        )
        AS
        $$

        SELECT "order_id", "name", "email", "stripe_invoice",  
            "shipping_address", "billing_address",
            ts_rank(search, websearch_to_tsquery('english', term)) +
            ts_rank(search, websearch_to_tsquery('simple', term)) as rank
            FROM orders
            WHERE search @@ websearch_to_tsquery('english', term)
            OR search @@ websearch_to_tsquery('simple', term)
            ORDER BY rank DESC;

        $$ language SQL;
        """
    )

def init():
    # Step 1.a: DROP Table - orders
    # _drop_table()
    # Step 1.b: Check if orders table exists
    # logging.info("1. check if orders table exists -> {}".format(_check_table_exists()))

    # Step 2: Create orders table
    # _create_table()
    # Step 2.b: Check if orders table exists
    logging.info("2.b. check if orders table exists -> {}".format(_check_table_exists()))
    #
    # Step 3.a: Check "search" column exists
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))
    # Step 3.b: Create dynamic column "search" to orders table
    # _add_search_column()
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))

    # Step 4: Create index "orders_search_idx"
    # _create_orders_search_idx()

    # Step 5: Create function "search_orders"
    # _drop_orders_search_fn()
    # _create_orders_search_fn()    

# if need to run independently
if __name__ == "__main__":
    init()
