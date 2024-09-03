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
    return {"message": "Anonymous User"}

@auth.post("/add", dependencies=[Depends(auth_lib.implicit_scheme)])
async def add_admin_user(model: UserCreateModel, user: Auth0User = Security(auth_lib.get_user)):
    await auth_service.validate_admin(f"{user}")
    await auth_service.create_user(user=UserModel(name=model.name,
                                                  email=model.email,
                                                  vendor=model.vendor,
                                                  image='',
                                                  role='admin'))
    return {"message": "OK"}

@auth.get("/secure", dependencies=[Depends(auth_lib.implicit_scheme)])
def test_secure_route(user: Auth0User = Security(auth_lib.get_user)):
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))
    result = auth_service.parse_email_vendor(user_details)
    return {"message": result}

@auth.get("/admin", dependencies=[Depends(auth_lib.implicit_scheme)])
async def check_user_is_admin(user: Auth0User = Security(auth_lib.get_user)):
    user_details = f"{user}"
    response: bool = await auth_service.check_user_is_admin(user_details)
    return {"message": True} if response else {"message": False}
