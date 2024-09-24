import logging
# fastapi
from fastapi import FastAPI, Depends, Security
from fastapi_auth0 import Auth0User
from models.user import UserCreateModel, UserModel
# custom
from services.auth import AuthService, auth_lib

# TODO: Move to service layer
auth_service = AuthService()

auth = FastAPI()
    

@auth.get('/public')
def test_public_route():
    """
        api call to check if endpoint can be called
        without a valid session token
    """
    return {"message": "Anonymous User"}


@auth.get("/check-admin", dependencies=[Depends(auth_lib.implicit_scheme)])
def test_secure_route(user: Auth0User = Security(auth_lib.get_user)):
    """
        this function validates session token & returns
        payload if the user is admin or not
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))
    result = auth_service.check_user_is_admin(user_details)
    return {"message": result}
