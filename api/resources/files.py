import logging
from fastapi import APIRouter, Depends, Security, HTTPException, status
from fastapi_auth0 import Auth0User
# custom
from services.auth import AuthService, auth_lib
from services.s3_file import FileService
from util.helper import config_logging

# logging configuration
config_logging(logging.DEBUG)

# init
file_service = FileService()
auth_service = AuthService()
files_router = APIRouter()

@files_router.get("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_file_list(bucket_name: str, user: Auth0User = Security(auth_lib.get_user)):
    """
    api endpoint to get list of all assets from s3 bucket    
    """
    user_details = f"{user}"
    logging.debug("User details are {}".format(user_details))    
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")    
    logging.debug(f"Querying s3 bucket")
    return file_service.list_s3_files(bucket_name)
