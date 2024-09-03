from re import sub
import os

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