import logging
from fastapi import APIRouter, Depends, Query, Security, HTTPException, status
from fastapi_auth0 import Auth0User
# custom
from models.asset import AssetRequestModel
from util.helper import config_logging
from services.auth import AuthService, auth_lib
from services.asset import AssetService

# logging configuration
config_logging(logging.DEBUG)

# init
auth_service = AuthService()
asset_service = AssetService()
asset_router = APIRouter()

@asset_router.get("/")
def get_assets():
    """
        api to fetch all assets from table
        for admin role
    """    
    result = asset_service.get_assets()
    return {"message": result}


@asset_router.get("/{asset_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_asset_details_by_id(asset_id: str, user: Auth0User = Security(auth_lib.get_user)):
    """
        api to fetch asset details by id from table
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = asset_service.get_asset_by_asset_id(asset_id=asset_id)
    return {"message": result}

@asset_router.post("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def add_new_asset_record(payload: AssetRequestModel, user: Auth0User = Security(auth_lib.get_user)):
    """
        api to add new asset record to table
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = asset_service.add_asset_record(asset=payload)
    return {"message": result}

@asset_router.put("/details/{asset_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def update_asset_record_by_id(asset_id: str, payload: AssetRequestModel, user:Auth0User = Security(auth_lib.get_user)):
    """
        api to update asset record details by id
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = asset_service.update_asset_record_by_id(asset_id=asset_id, asset=payload, position=payload.position or 0)
    return {"message": result}


@asset_router.put("/position/{asset_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def update_asset_position_by_id(asset_id: str, position: int = Query(0, description="position of the asset", include_in_schema=True), user:Auth0User = Security(auth_lib.get_user)):
    """
        api to update asset record position by id
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = asset_service.update_asset_position_by_id(asset_id=asset_id, position=position)
    return {"message": result}

@asset_router.delete("/{asset_id}", dependencies=[Depends(auth_lib.implicit_scheme)])
def delete_asset_record_by_id(asset_id: str, user:Auth0User = Security(auth_lib.get_user)):
    """
        api to delete asset record details by id
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = asset_service.delete_asset_record_by_id(asset_id=asset_id)
    return {"message": result}
