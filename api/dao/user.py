"""
   DAO layer for users table
   related queries
"""
from typing import Optional, List
import logging
from sqlalchemy.orm import Session, sessionmaker
## ..custom
from dao.sql_alchemy_models import get_connection
from dao.sql_alchemy_models import User
from exceptions.custom_exceptions import UserDAOException

# init session class
engine = get_connection()

def get_users() -> Optional[List]:
    """
        Fetch all records
        from users table
    """
    logging.debug("DAO - get all users")
    try:
        with Session(engine) as session:
            users = session.query(User).all()
            return users
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise UserDAOException("UserDAO Error! error reading records from users table")

def get_by_user_email(email: str) -> Optional[User]:
    """
        Fetch user record by email
        from users table
        returns None if record doesn't exist
    """
    logging.debug("DAO - get user by email")
    try:
        with Session(engine) as session:
            user: Optional[User] = session.query(User).filter_by(email=email).first()
            return user
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise UserDAOException("UserDAO Error! error fetching user by email from users table")

def check_user_is_admin_from_table(email: str, vendor: str) -> bool:
    """
        Checks from users table
        if the record exists.
        If record exists, then user is admin        
    """
    logging.debug("DAO - get user by email")
    try:
        with Session(engine) as session:
            user: Optional[User] = session.query(User)\
                                    .filter_by(email=email, vendor=vendor, role="admin")\
                                    .first()
            return user is not None
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        return False

def add_user_record(record: User) -> Optional[User]:
    """
        Add new record of User
    """
    logging.debug("DAO - adding new record")
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        new_user = User(**record)
        session.add(new_user)
        session.commit()
        print(f"User created: {new_user}")
        return new_user
    except Exception as e:
        session.rollback()
        print(f"Error creating user: {e}")
    finally:
        session.close()
    

def delete_user_record_by_email(email: str) -> bool:
    """
        Checks for user record with email
        if record found, deletes -> returns True
        for all else -> returns False
    """
    logging.debug("DAO - get user by email")
    try:
        with Session(engine) as session:
            user: Optional[User] = session.query(User).filter_by(email=email).first()
            if not user:
                return False
            session.delete(user)
            return True
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")
        return False
