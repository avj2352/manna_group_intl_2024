"""
DAO layer for products table
related queries
"""
from typing import Optional, List
import logging
from sqlalchemy.orm import Session, sessionmaker
# custom
from dao.sql_alchemy_models import (Asset, Product, AssetProduct, get_connection)
from util.helper import get_current_timestamp
from models.product import ProductModel, ProductResponseModel
from models.asset import AssetModel
from exceptions.custom_exceptions import ProductDAOException, AssetDAOException

# init session class
engine = get_connection()

def get_products() -> List[ProductResponseModel]:
    """
        Fetch all records
        from products table
    """
    logging.info("DAO -> Querying products")
    results: List[ProductResponseModel] = []
    try:
        with Session(engine) as session:
            products: List[Product] = session.query(Product).all()
            for item in products:
                assets = session.query(AssetProduct).filter_by(product_id = item.product_id).all()
                results.append(ProductResponseModel(
                    product_id=item.product_id,
                    name=item.name,
                    description=item.description,
                    content=item.content,
                    assets=[asset.asset_id for asset in assets],
                    created_date=item.created_date,
                    created_by=item.created_by,
                    price=item.price,
                    currency=str(item.currency).lower(),
                    quantity=item.quantity
                ))
            return results
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise ProductDAOException("AssetDAO Error! error reading records from products table")        
        
# internal function to get asset record details
def _get_asset_record_by_id(asset_id: str) -> Optional[AssetModel]:
    """
        Fetch all records
        from assets table
        where asset_id equals asset_id
    """
    logging.debug(f"DAO -> get all assets with asset_id (Products DAO): {asset_id}")
    try:
        with Session(engine) as session:
            record: Optional[Asset] = session.query(Asset).filter(Asset.asset_id == asset_id).first()
            if record is None:
                logging.debug(f"No record found for asset_id: {asset_id}")
                return None
            return AssetModel(**record)
    except Exception as err:
        logging.error(f"Error querying SQL alchemy {err.__class__}: {err}")    
        raise AssetDAOException("AssetDAO Error! error reading record from assets table")      
        

def get_product_by_id(product_id: str) -> Optional[ProductModel]:
    logging.info("DAO: Querying products by product_id")    
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        product_record = session.query(Product).filter_by(product_id=product_id).first()
        if product_record is None:
            logging.debug(f"No record found for product_id: {product_id}")
            return None                
        assets = session.query(AssetProduct).filter_by(product_id=product_record.product_id).all()
        return ProductModel(
            product_id=product_record.product_id,
            name=product_record.name,
            description=product_record.description,
            content=product_record.content,
            assets=[_get_asset_record_by_id(asset.asset_id) for asset in assets],
            created_date=product_record.created_date,
            created_by=product_record.created_by,                
            price=product_record.price,
            currency=product_record.currency,
            quantity=product_record.quantity                
        )        
    except Exception as err:
        logging.error(f"DAO: Error query SQL alchemy {err.__class__} - {err}")
        raise ProductDAOException("DAO -> Error retrieving record by id from products table")
    finally:
        session.close()

def add_product_record(product: ProductModel) -> bool:
    """
        Add a new record
        to products table
        True -> record added, success
        False -> error adding record to products table
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        logging.info("DAO: Add a new record in products table")
        product_record = Product(
            product_id = product.product_id,
            name = product.name,
            description = product.description,
            content = product.content,
            created_by = product.created_by,
            created_date = get_current_timestamp(),    
            price = product.price,
            quantity = product.quantity,
            currency = str(product.currency).lower(),
        )
        session.add(product_record)
        session.commit()
        logging.info("DAO: Add a new record in asset_products table")
        for (idx, item) in enumerate(product.assets):
            asset_product_record = AssetProduct(
                asset_id = item,
                product_id = product.product_id,
                position = idx+1
            )
            session.add(asset_product_record)
        session.commit()
        return True
    except Exception as err:
        logging.error(f"DAO: Error adding new record - {err.__class__} - {err}")
        return False
    finally:
        session.close()



def delete_product_by_id(product_id: str) -> bool:
    """
        Delete record from the below tables, based on product_id
        - AssetProduct table
        - Product table
    """
    """
        delete asset record by id
        if record found, deletes -> returns True
        for all else -> returns False
    """
    logging.debug(f"DAO -> delete by product id: {product_id}")
    try:
        with Session(engine) as session:
            asset_product_record = session\
                        .query(AssetProduct)\
                        .filter_by(product_id=product_id).first()
            if not asset_product_record:
                logging.info(f"No records found in AssetProducts table for product_id: {product_id}")
            else:
                session.delete(asset_product_record)
            product_record = session\
                        .query(Product)\
                        .filter_by(product_id=product_id).first()
            if not product_record:
                logging.info(f"No records found in Products table for product id: {product_id}")
            # commit delete
            session.commit()
            return True
    except Exception as err:
        logging.error(f"Error deleting asset record: {err.__class__} - {str(err)}")
        return False
