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
DB_USERNAME = os.environ.get('DB_USERNAME') or None
DB_PASSWORD = os.environ.get('DB_PASSWORD') or None
MAX_DB_CONN = os.environ.get('MAX_DB_CONN') or None

# Email admin details
EMAIL_SENDER = os.environ.get('EMAIL_SENDER') or "intlpowerministries@gmail.com"
EMAIL_CC = os.environ.get('EMAIL_CC') or None
REGION_NAME = os.environ.get('REGION_NAME') or "us-east-1"

# AWS related
AWS_ACCESS_KEY = os.environ.get('AWS_ACCESS_KEY') or None
AWS_SECRET_KEY = os.environ.get('AWS_SECRET_KEY') or None
MANNA_IMAGES_BUCKET = os.environ.get('MANNA_IMAGES_BUCKET') or None
MANNA_FILES_BUCKET = os.environ.get('MANNA_FILES_BUCKET') or None

# Cache related
CACHE_TTL = os.environ.get('CACHE_TTL') or None
CACHE_TTL_DB = os.environ.get('CACHE_TTL_DB') or None
CACHE_MAX_SIZE = os.environ.get('CACHE_MAX_SIZE') or None

# Encryption
KEY_SIGNATURE = os.environ.get('KEY_SIGNATURE') or ""

# get cc recipients list
def get_email_cc_list() -> list:
    list_string = EMAIL_CC or ''    
    list = list_string.split(',')
    result = []
    for item in list:
      result.append({"email": item})
    # print(f"result is: {result}")
    return result
    
