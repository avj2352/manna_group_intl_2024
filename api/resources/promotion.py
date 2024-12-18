import logging
from fastapi import APIRouter, Depends, Security, HTTPException, status
from fastapi_auth0 import Auth0User
# custom
from models.promotion import PromotionRequestModel
from util.helper import config_logging
from services.promotion import PromotionService
from services.auth import AuthService, auth_lib


# logging configuration
config_logging(logging.DEBUG)

# init
auth_service = AuthService()
promo_service = PromotionService()
promo_router = APIRouter()

@promo_router.get("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_promotions():
    """
        api to fetch all promotion records from table
        for admin role
    """    
    result = promo_service.get_promotions()
    return {"message": result}

@promo_router.get("/{promo_name}")
def fetch_promo_details_by_name(promo_name: str):
    """
        api to fetch promotion details by name, for checkout page        
    """    
    result = promo_service.get_promotion_by_name(promo_name=promo_name)
    return {"message": result}


@promo_router.get("/details/{promo_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_promo_details_by_id(promo_id: str, user: Auth0User = Security(auth_lib.get_user)):
    """
        api to fetch promotion details by id from table
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = promo_service.get_promotion_by_id(promo_id=promo_id)
    return {"message": result}

@promo_router.post("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def add_new_promo_record(payload: PromotionRequestModel, user: Auth0User = Security(auth_lib.get_user)):
    """
        api to add new promotion record to table
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    logging.debug(f"Start date is: {payload.start_date}")
    logging.debug(f"End date is: {payload.end_date}")
    result = promo_service.add_promo_record(promo_record=payload)
    return {"message": result}

@promo_router.put("/details/{promo_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def update_promo_record_by_id(promo_id: str, payload: PromotionRequestModel, user:Auth0User = Security(auth_lib.get_user)):
    """
        api to update promotion record details by id
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = promo_service.update_promo_by_id(promo_id=promo_id, promo_record=payload)
    return {"message": result}


@promo_router.delete("/{promo_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def delete_promo_record_by_id(promo_id: str, user:Auth0User = Security(auth_lib.get_user)):
    """
        api to delete promotion record details by id
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = promo_service.delete_promo_by_id(promo_id=promo_id)
    return {"message": result}
