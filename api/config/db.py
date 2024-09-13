"""
Database class which creates
a DB connection pool
for scalability, performance & for handling DB connections
for multi-threaded requests
"""
import psycopg2
import logging
from typing import Union, List
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import DictCursor, RealDictRow
from util.env_config import SQL_CONN, DB_NAME, MAX_DB_CONN, DB_PASSWORD, DB_USERNAME

if SQL_CONN is None or DB_NAME is None or MAX_DB_CONN is None or DB_USERNAME is None or DB_PASSWORD is None:
    raise BaseException('Missing db env variables')

class Database:
    def __init__(self):
        self._connection_pool = SimpleConnectionPool(minconn=1,
            maxconn=MAX_DB_CONN, dsn=f"postgres://{DB_USERNAME}:{DB_PASSWORD}@{SQL_CONN}/{DB_NAME}")

    # to execute crud statements
    def execute_query(self, query, params: Union[List, None]=None):
            conn = self._connection_pool.getconn()
            cursor = conn.cursor(cursor_factory=DictCursor)
            logging.debug(f"execute query: {query}")
            try:
                if params and len(params) > 0:
                    cursor.execute(query, tuple(params))
                else:
                    cursor.execute(query)
                conn.commit()
            except (Exception, psycopg2.DatabaseError) as error:
                logging.error("Error executing query - {}".format(str(error)))
                conn.rollback()
            finally:
                cursor.close()
                self._connection_pool.putconn(conn) # release connection to pool connections

    # to execute sql queries with single response
    def execute_query_result(self, query, params: Union[List, None]=None) -> Union[RealDictRow, None]:
        conn = self._connection_pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        try:
            if params and len(params) > 0:
                cursor.execute(query, tuple(params))
            else:
                cursor.execute(query)
            result = cursor.fetchone()
            logging.debug(f"Result is: {result}")
            conn.commit()
            return result
        except (Exception, psycopg2.DatabaseError) as error:
            logging.error("Fetchone - Error executing query - {}".format(str(error)))
            conn.rollback()
        finally:
            cursor.close()
            self._connection_pool.putconn(conn) # release connection to pool connections

    # to execute sql queries with series of response
    def execute_query_results(self, query, params: Union[List, None]=None) -> Union[List, None]:
        conn = self._connection_pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        try:
            if params and len(params) > 0:
                cursor.execute(query, tuple(params))
            else:
                cursor.execute(query)
            conn.commit()
            result = cursor.fetchall()
            return result
        except (Exception, psycopg2.DatabaseError) as error:
            logging.error("Fetchall - Error executing query - {}".format(str(error)))
            conn.rollback()
        finally:
            cursor.close()
            self._connection_pool.putconn(conn) # release connection to pool connections

# Singleton instance
db_instance = Database()