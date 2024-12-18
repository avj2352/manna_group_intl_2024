from re import sub
from datetime import datetime
import pytz
import re
import os
import logging

'''
Collection of helper functions
'''

# Helper to read numbers using var envs
def cast_to_number(id):
    temp = os.environ.get(id)
    if temp is not None:
        try:
            return float(temp)
        except ValueError:
            return None
    return None

# VALIDATION HELPERS ============================

# Helper function to conver string to snake case
# Returns {str} snake_case_format
def snake_case_validation(s: str) -> str:
  return '_'.join(
    sub('([A-Z][a-z]+)', r' \1',
    sub('([A-Z]+)', r' \1',
    s.replace('-', ' '))).split()).lower()

def is_part_of_list(s: str, options: list) -> bool:
    return s.lower() in options


def config_logging(level):
    FORMAT = "%(levelname)s: %(asctime)s [%(filename)s:%(lineno)s - %(funcName)s() ] - %(message)s"
    DATE_FMT = "%Y-%m-%d %H:%M:%S"
    logging.basicConfig(format=FORMAT, datefmt=DATE_FMT, level=level)
    

# get currenttimestamp with timezone in str format
def get_current_timestamp() -> str:
    utc_zone = pytz.utc
    current_time = datetime.now(utc_zone)
    # format
    formatted_time = current_time.strftime("%d, %b %Y %H:%M:%S")
    return formatted_time

# Check if the string matches 
# the snake case pattern
def is_snake_case(s: str) -> bool:
    # Check if the string matches the snake case pattern
    return bool(re.match(r'^[a-z0-9]+(_[a-z0-9]+)*$', str(s).lower()))