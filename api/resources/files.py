import logging
# fastapi
from fastapi import FastAPI
# custom
from services.s3_file import FileService
from util.about import config, description


# TODO: Move to service layer
file_service = FileService()

files = FastAPI(
    title = config.title,
    version = config.version,
    description = description,
    openapi_tags = config.tags_metadata
)

@files.get('/')
def get_file_list(bucket_name: str):
    logging.debug(f"Querying s3 bucket")
    return file_service.list_s3_files(bucket_name)