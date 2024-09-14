"""
contains migration scripts for
galleries entity / table
"""
import logging
from config.db import db_instance

# check if table already exists
def _check_table_exists() -> bool:
    table_exists = False
    result = db_instance.execute_query_result(f"""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'galleries'
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
              AND table_name = 'galleries'
              AND column_name = 'search'
        );
    """)

    if result is not None:
        col_exists = result['exists']  # Fetch the boolean result
    return col_exists

# safe way to delete table
def _drop_table():
    logging.info(f"..drop galleries if exists")
    db_instance.execute_query(f"""
            DROP TABLE IF EXISTS galleries CASCADE;
            """)

# create galleries table
def _create_table():
    db_instance.execute_query(f"""
        CREATE TABLE IF NOT EXISTS galleries (
            "_id" SERIAL UNIQUE PRIMARY KEY,
            "gallery_id" VARCHAR UNIQUE NOT NULL,
            "title" VARCHAR NOT NULL,
            "description" VARCHAR,
            "position" INTEGER NOT NULL            
        );
        """)

def _add_search_column():
    db_instance.execute_query(f"""
        ALTER TABLE galleries
            ADD search tsvector
            GENERATED ALWAYS AS (
                setweight(to_tsvector('english', title), 'A') || ' ' ||
                setweight(to_tsvector('english', description), 'B') :: tsvector
            ) STORED
        """)

def _create_galleries_search_idx():
    logging.info("4. create index - gallery_search_idx")
    db_instance.execute_query(f"""
        create index gallery_search_idx on galleries using GIN(search);;
        """)

def _drop_galleries_search_fn():
    logging.info("5.a: drop gallery_search_fn")
    db_instance.execute_query("""
        DROP FUNCTION gallery_search_fn(term text)
        """)

def _create_galleries_search_fn():
    logging.info("5. create gallery_search_fn")
    db_instance.execute_query(f"""
        CREATE OR REPLACE FUNCTION gallery_search_fn(term text)
        RETURNS TABLE(
            "gallery_id" VARCHAR,
            "title" text,
            "description" text,
            "rank" REAL
        )
        AS
        $$

        SELECT "gallery_id", "title", "description",
            ts_rank(search, websearch_to_tsquery('english', term)) +
            ts_rank(search, websearch_to_tsquery('simple', term)) as rank
            FROM galleries
            WHERE search @@ websearch_to_tsquery('english', term)
            OR search @@ websearch_to_tsquery('simple', term)
            ORDER BY rank DESC;

        $$ language SQL;
        """
    )

def init():
    # Step 1.a: DROP Table - galleries
    # _drop_table()
    # Step 1.b: Check if galleries table exists
    # logging.info("1. check if galleries table exists -> {}".format(_check_table_exists()))

    # Step 2: Create galleries table
    #_create_table()
    # Step 2.b: Check if galleries table exists
    logging.info("2.b. check if galleries table exists -> {}".format(_check_table_exists()))
    #
    # Step 3.a: Check "search" column exists
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))
    # Step 3.b: Create dynamic column "search" to galleries table
    # _add_search_column()
    # logging.info("3. check if search column exists -> {}".format(_check_search_column_exists()))

    # Step 4: Create index "galleries_search_idx"
    # _create_galleries_search_idx()

    # Step 5: Create function "search_galleries"
    # _drop_galleries_search_fn()
    # _create_galleries_search_fn()    

# if need to run independently
if __name__ == "__main__":
    init()
