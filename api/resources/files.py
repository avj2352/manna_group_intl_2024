import logging
# fastapi
from fastapi import APIRouter
# custom
from services.s3_file import FileService
from util.about import config, description

# s3 file service
file_service = FileService()

files_router = APIRouter()

@files_router.get('/')
def get_file_list(bucket_name: str):
    """
    api endpoint to get list of all assets from s3 bucket    
    """
    logging.debug(f"Querying s3 bucket")
    return file_service.list_s3_files(bucket_name)
