# custom
import logging
import re
from fastapi import HTTPException, status
# custom
from util.env_config import AUTH0_DOMAIN, AUTH0_AUDIENCE
from dao.user import check_user_is_admin_from_table
from models.user import UserCreateModel, user_response_entity
from dao.user import get_by_user_email, add_user_record
from fastapi_auth0 import Auth0

auth_lib = Auth0(domain=AUTH0_DOMAIN, api_audience=AUTH0_AUDIENCE, scopes={})

class AuthService:    

    # create new record
    def create_user(self, user: UserCreateModel) -> dict:
        add_user_record(user)
        return {"message": "OK"}
    
    # get email and vendor from string
    def _parse_email_vendor(self, input: str) -> dict:
        logging.debug(f"Parsing user details from string: {input}")
        result = {}
        email_regex = r"([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)"
        vendor_regex = r"\'([a-zA-Z].*?)\|"
        email_matches = re.finditer(email_regex, input, re.DOTALL)
        vendor_matches = re.finditer(vendor_regex, input, re.DOTALL)
        for match in email_matches:
            logging.debug("Match found: {}".format(match.group()))
            result["email"] = match.group()
        for match in vendor_matches:
            logging.debug("Match found: {}".format(match.group()))
            result["vendor"] = match.group()[1:-1]
        return result

    # check if user is present in admin table
    def check_user_is_admin(self, data: str) -> bool:
        user_details = self._parse_email_vendor(data)
        email = user_details.get('email')
        vendor = user_details.get('vendor')
        logging.debug(f"Checking user details in db: {email}, {vendor}")
        return check_user_is_admin_from_table(email=email, vendor=vendor)

    def validate_admin(self, user: str):        
        response: bool = self.check_user_is_admin(user)
        logging.debug("is user admin: {}".format(str(response)))
        if not response: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not an Admin")
        
    def find_user_by_email_vendor(self, data: str):
        logging.debug(f"find user by email : {data}")
        user_details = self._parse_email_vendor(data)
        email = user_details.get('email')
        vendor = user_details.get('vendor')
        logging.debug('Checking user details in db: {}, {}'.format(email, vendor))
        record = get_by_user_email(email=email)
        logging.debug('User record details are: ', record)
        return {"email": email, "vendor": vendor}