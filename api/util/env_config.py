'''
Environment Config 
Class to fetch environment variables and provide them
for easy access
NOTE: configured default values here as well
'''
import os

# auth0 related
AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN') or None
AUTH0_AUDIENCE = os.environ.get('AUTH0_AUDIENCE') or None 

# database related
SQL_CONN = os.environ.get('SQL_CONN') or None
DB_NAME = os.environ.get('DB_NAME') or None
MAX_DB_CONN = os.environ.get('MAX_DB_CONN') or None

# stripe related
STRIPE_PUB_KEY = os.environ.get('STRIPE_PUB_KEY') or None
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY') or None


# Email admin details
EMAIL_SENDER = os.environ.get('EMAIL_SENDER') or "intlpowerministries@gmail.com"
EMAIL_CC = os.environ.get('EMAIL_CC') or None
SERVICE_NAME = os.environ.get('SERVICE_NAME') or "s3"
REGION_NAME = os.environ.get('REGION_NAME') or "us-east-1"

# AWS related
S3_ACCESS_KEY = os.environ.get('S3_ACCESS_KEY') or None

# get cc recipients list
def get_email_cc_list() -> list:
    list_string = EMAIL_CC or ''    
    list = list_string.split(',')
    result = []
    for item in list:
      result.append({"email": item})
    # print(f"result is: {result}")
    return result
    
