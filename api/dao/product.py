"""
DAO layer for products table
related queries
"""
from util.helper import get_current_timestamp
from fastapi import HTTPException
from typing import Optional, List
from sqlalchemy import delete
from models.product import ProductModel, ProductResponseModel
from models.asset import AssetModel
from dao.sql.sql_alchemy_models import Asset, Product, AssetProduct
from config.db import Session
import logging

def get_products() -> List:
    result = []
    session = Session()
    try:
        logging.info("DAO: Querying products")
        products = session.query(Product).all()
        for item in products:
            logging.info("DAO: Getting assets for product")                    
            assets = session.query(AssetProduct).filter_by(product_id=item.product_id).all()
            result.append(ProductResponseModel(
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
        return result
    except Exception as err:
        logging.error(f"DAO: Error querying SQL alchemy {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")  
    finally:
        session.close()
        
# internal function to get asset record details
def _get_asset_record_by_id(asset_id: str) -> Optional[AssetModel]:
    logging.info("DAO: Querying assets table by asset_id")
    result = []
    session = Session()
    try:
        asset_record = session.query(Asset).filter_by(asset_id=asset_id).first()
        if not asset_record: 
            return None        
        return AssetModel(
            asset_id=asset_record.asset_id,
            position=asset_record.position,
            asset_type=asset_record.asset_type,
            description=asset_record.description,
            asset_key=asset_record.asset_key
        )        
    except Exception as err:
        logging.error(f"DAO: Error querying SQL alchemy {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()
        

def get_product_by_id(product_id: str) -> Optional[ProductModel]:
    logging.info("DAO: Querying products by product_id")    
    session = Session()
    try:
        product_record = session.query(Product).filter_by(product_id=product_id).first()
        if not product_record: 
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
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

def add_product_record(product: ProductModel) -> Optional[str]:
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
        return f"Added new record in Products & AssetProducts table - {product.product_id}"
    except Exception as err:
        logging.error(f"DAO: Error adding new record - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()



def delete_product_by_id(product_id: str) -> str:
    session = Session()
    try:
        logging.debug(f"DAO: delete record in Products table by id - {product_id} ")
        stmt_01 = (delete(Product).\
            where(Product.product_id == product_id)            
            )
        session.execute(stmt_01)
        logging.debug(f"DAO: delete record in AssetProducts table by id - {product_id} ")
        stmt_02 = (delete(AssetProduct).\
            where(AssetProduct.product_id == product_id)            
            )
        session.execute(stmt_02)
        session.commit()
        return f"Deleted product record: {product_id}"
    except Exception as err:
        logging.error(f"DAO: Error deleting record by id: {product_id} - {err.__class__} - {err}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()