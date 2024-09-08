"""
contains migration scripts for
tag entity / table
"""
import logging
from config.db import db_instance

TABLE_NAME = 'products'

# check if table already exists
def _check_table_exists() -> bool:
    table_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = {TABLE_NAME}
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
              AND table_name = {TABLE_NAME}
              AND column_name = 'search'
        );
    """)

    if result is not None:
        col_exists = result['exists']  # Fetch the boolean result
    return col_exists

# safe way to delete table
def _drop_table():
    logging.info(f"..drop tag {TABLE_NAME} if exists")
    db_instance.execute_query(f"""
            DROP TABLE IF EXISTS {TABLE_NAME} CASCADE;
            """)

# create tag table
def _create_table():
    db_instance.execute_query(f"""
        CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
            "_id" SERIAL UNIQUE PRIMARY KEY,
            "name" VARCHAR UNIQUE NOT NULL,
            "description" VARCHAR,
            "content" VARCHAR NOT NULL,
            "created_by" VARCHAR NOT NULL,
            "created_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "price" NUMERIC(5, 2) NOT NULL,
            "quantity" INTEGER NOT NULL,
            "currency" VARCHAR NOT NULL
        );
        """)

def _add_search_column():
    db_instance.execute_query(f"""
        ALTER TABLE {TABLE_NAME}
            ADD search tsvector
            GENERATED ALWAYS AS (
                setweight(to_tsvector('english', name), 'A') || ' ' ||
                setweight(to_tsvector('english', description), 'B') :: tsvector
            ) STORED
        """)

def _create_tag_search_idx():
    logging.info("4. create index - product_search_idx")
    db_instance.execute_query(f"""
        create index product_search_idx on {TABLE_NAME} using GIN(search);;
        """)

def _drop_tag_search_fn():
    logging.info("5.a: drop product_search_fn")
    db_instance.execute_query("""
        DROP FUNCTION product_search_fn(term text)
        """)

def _create_tag_search_fn():
    logging.info("5. create product_search_fn")
    db_instance.execute_query(f"""
        CREATE OR REPLACE FUNCTION product_search_fn(term text)
        RETURNS TABLE(
            "_id" INT,
            "name" text,
            "description" text,
            "rank" REAL
        )
        AS
        $$

        SELECT "_id", "name", "description",
            ts_rank(search, websearch_to_tsquery('english', term)) +
            ts_rank(search, websearch_to_tsquery('simple', term)) as rank
            FROM {TABLE_NAME}
            WHERE search @@ websearch_to_tsquery('english', term)
            OR search @@ websearch_to_tsquery('simple', term)
            ORDER BY rank DESC;

        $$ language SQL;
        """
    )

def init():
    # Step 1.a: DROP Table - tag
    # _drop_table()
    # Step 1.b: Check if tag table exists
    # logging.info("1. check if tag table exists -> {}".format(_check_table_exists()))

    # Step 2: Create tag table
    _create_table()
    # Step 2.b: Check if tag table exists
    logging.info("2.b. check if products table exists -> {}".format(_check_table_exists()))
    #
    # Step 3.a: Check "search" column exists
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))
    # Step 3.b: Create dynamic column "search" to tag table
    # _add_search_column()

    # Step 4: Create index "tag_search_idx"
    # _create_tag_search_idx()

    # Step 5: Create function "search_tag"
    # _drop_tag_search_fn()
    # _create_tag_search_fn()
    pass

# if need to run independently
if __name__ == "__main__":
    init()