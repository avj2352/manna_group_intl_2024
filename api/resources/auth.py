import logging
# fastapi
from fastapi import APIRouter, Depends, Security
from fastapi_auth0 import Auth0User
from models.user import UserCreateModel, UserModel
# custom
from services.auth import AuthService, auth_lib
from util.about import config, description

# TODO: Move to service layer
auth_service = AuthService()

auth_router = APIRouter()
    

@auth_router.get('/public')
def test_public_route():
    """
        api call to check if endpoint can be called
        without a valid session token
    """
    return {"message": "Anonymous User"}


@auth_router.get("/check-admin", dependencies=[Depends(auth_lib.implicit_scheme)])
def test_secure_route(user: Auth0User = Security(auth_lib.get_user)):
    """
        api to validate session token & check
        if the user is admin or not
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))
    result = auth_service.check_user_is_admin(user_details)
    return {"message": result}
