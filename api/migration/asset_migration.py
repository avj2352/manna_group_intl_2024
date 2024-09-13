"""
contains migration scripts for
assets entity / table
"""
import logging
from config.db import db_instance

# check if table already exists
def _check_table_exists() -> bool:
    table_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'assets'
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
              AND table_name = 'assets'
              AND column_name = 'search'
        );
    """)

    if result is not None:
        col_exists = result['exists']  # Fetch the boolean result
    return col_exists

# safe way to delete table
def _drop_table():
    logging.info(f"..drop assets if exists")
    db_instance.execute_query(f"""
            DROP TABLE IF EXISTS assets CASCADE;
            """)

# create assets table
def _create_table():
    db_instance.execute_query(f"""
        CREATE TABLE IF NOT EXISTS assets (
            "_id" SERIAL UNIQUE PRIMARY KEY,
            "position" INTEGER NOT NULL,
            "type" VARCHAR NOT NULL,
            "description" VARCHAR,
            "link" VARCHAR NOT NULL            
        );
        """)

def _add_search_column():
    db_instance.execute_query(f"""
        ALTER TABLE assets
            ADD search tsvector
            GENERATED ALWAYS AS (
                setweight(to_tsvector('english', link), 'A') || ' ' ||
                setweight(to_tsvector('english', description), 'B') :: tsvector
            ) STORED
        """)

def _create_assets_search_idx():
    logging.info("4. create index - asset_search_idx")
    db_instance.execute_query(f"""
        create index asset_search_idx on assets using GIN(search);;
        """)

def _drop_assets_search_fn():
    logging.info("5.a: drop asset_search_fn")
    db_instance.execute_query("""
        DROP FUNCTION asset_search_fn(term text)
        """)

def _create_assets_search_fn():
    logging.info("5. create asset_search_fn")
    db_instance.execute_query(f"""
        CREATE OR REPLACE FUNCTION asset_search_fn(term text)
        RETURNS TABLE(
            "_id" INT,
            "link" text,
            "description" text,
            "rank" REAL
        )
        AS
        $$

        SELECT "_id", "link", "description",
            ts_rank(search, websearch_to_tsquery('english', term)) +
            ts_rank(search, websearch_to_tsquery('simple', term)) as rank
            FROM assets
            WHERE search @@ websearch_to_tsquery('english', term)
            OR search @@ websearch_to_tsquery('simple', term)
            ORDER BY rank DESC;

        $$ language SQL;
        """
    )

def init():
    # Step 1.a: DROP Table - assets
    # _drop_table()
    # Step 1.b: Check if assets table exists
    logging.info("1. check if assets table exists -> {}".format(_check_table_exists()))

    # Step 2: Create assets table
    # _create_table()
    # Step 2.b: Check if assets table exists
    # logging.info("2.b. check if assets table exists -> {}".format(_check_table_exists()))
    #
    # Step 3.a: Check "search" column exists
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))
    # Step 3.b: Create dynamic column "search" to assets table
    # _add_search_column()
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))

    # Step 4: Create index "assets_search_idx"
    # _create_assets_search_idx()

    # Step 5: Create function "search_assets"
    # _drop_assets_search_fn()
    # _create_assets_search_fn()    

# if need to run independently
if __name__ == "__main__":
    init()