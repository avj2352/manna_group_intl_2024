import logging
from fastapi import APIRouter, Depends, Query, Security, HTTPException, status
from fastapi_auth0 import Auth0User
# custom
from models.product import ProductRequestModel
from util.helper import config_logging
from services.auth import AuthService, auth_lib
from services.product import ProductService

# logging configuration
config_logging(logging.DEBUG)

# init
auth_service = AuthService()
product_service = ProductService()
product_router = APIRouter()

@product_router.get("/")
def get_products():
    """
        api to fetch all products from table        
    """    
    result = product_service.get_products()
    return {"message": result}


@product_router.get("/{product_id}")
def get_product_details_by_id(product_id: str):
    """
        api to fetch product details by id from table        
    """    
    result = product_service.get_product_by_id(product_id=product_id)
    return {"message": result}

@product_router.post("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def add_new_product_record(payload: ProductRequestModel, user: Auth0User = Security(auth_lib.get_user)):
    """
        api to add new product record to table
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    user = auth_service.find_user_by_email_vendor(user_details)
    result = product_service.add_product_record(product=payload, user_id=user.get("email", ""))
    return {"message": result}

@product_router.delete("/{product_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def delete_product_by_id(product_id: str, user:Auth0User = Security(auth_lib.get_user)):
    """
        api to delete product record details by id
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = product_service.delete_product_record_by_id(product_id=product_id)
    return {"message": result}
