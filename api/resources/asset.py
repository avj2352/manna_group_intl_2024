import logging
# fastapi
from fastapi import APIRouter, Depends, Security, HTTPException, status
from fastapi_auth0 import Auth0User
from models.user import UserCreateModel, UserModel
# custom
from services.auth import AuthService, auth_lib
from services.asset import AssetService
from util.about import config, description

# TODO: Move to service layer
auth_service = AuthService()
asset_service = AssetService()
asset_router = APIRouter()

@asset_router.get("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_assets(user: Auth0User = Security(auth_lib.get_user)):
    """
        api to fetch all assets from table
        for admin role
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
    result = asset_service.get_assets()
    return {"message": result}


@asset_router.get("/:asset_id", dependencies=[Depends(auth_lib.implicit_scheme)])
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
    