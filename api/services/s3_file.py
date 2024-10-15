"""
AWS S3 File Service
Used for create, update, read, delete of AWS S3 files.
Requires the S3 bucket to be created in AWS and it's name...
...configured in Envronment files
"""

from typing import List, Optional
from fastapi import HTTPException, UploadFile, status
import logging
import boto3
from botocore.exceptions import ClientError
from cachetools import cached, TTLCache
# custom
from util.env_config import (
    REGION_NAME,
    AWS_ACCESS_KEY,
    CACHE_MAX_SIZE,
    CACHE_TTL,
    AWS_SECRET_KEY,
    MANNA_FILES_BUCKET,
    MANNA_IMAGES_BUCKET,
)

class FileService:
    def __init__(self):
        self.s3 = boto3.resource(
            service_name="s3",
            region_name=REGION_NAME,
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
        )

    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def create_presigned_url(
        self, bucket_name, object_name, expiration=3600
    ) -> Optional[str]:
        """
        Generate a presigned URL to share an S3 object
        """
        try:
            s3_client = boto3.client("s3")
            url = s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": bucket_name, "Key": object_name},
                ExpiresIn=expiration,
            )
            return url
        except ClientError as e:
            logging.error(e)
            return None

    @cached(cache=TTLCache(maxsize=int(CACHE_MAX_SIZE), ttl=int(CACHE_TTL)))
    def list_s3_files(self, bucket_name: str) -> List:
        """
        List all files in an S3 bucket
        """
        # logging.debug(f"AWS Credentials are: {AWS_ACCESS_KEY}, {AWS_SECRET_KEY}")
        try:
            result = []
            logging.debug(f"bucket name: {bucket_name}")
            if bucket_name is None or bucket_name not in [ MANNA_FILES_BUCKET, MANNA_IMAGES_BUCKET ]:
                raise ValueError("Invalid bucket name")
            # read files from s3 bucket
            logging.debug(f"reading files")
            s3_client = boto3.client("s3")
            response = s3_client.list_objects_v2(Bucket=bucket_name)
            # logging.debug(f"response: {response}")
            if response is None or response["Contents"] is None:
                logging.debug(f"Invalid bucket name / empty contents: {str(err)}")
                return []
            for item in list(response["Contents"]):
                record = {}
                record["name"] = item["Key"]
                # record["url"] = self.create_presigned_url(bucket_name, item["Key"])
                record["filesize"] = item["Size"]
                result.append(record)
            return result
        except ClientError as e:
            return list(response["Contents"])
        except KeyError as err:
            logging.info(f"Invalid bucket name / empty contents: {str(err)}")
            return []
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="invalid bucket name"
            )
        except UnboundLocalError as err:
            logging.info(f"Error - UnboundLocalError: {err.__class__}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="error unbound local error"
            )
        except Exception as err:
            logging.info(f"Error reading files: {err.__class__}")
            logging.info(f"Error reading files: {str(err)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="error reading bucket",
            )

    # upload to remote s3    
    async def upload_file(self, file: UploadFile, type: str = "images") -> str:
        try:
            if type is None or type not in ["images", "files"]:
                raise ValueError("Invalid type name")
            bucket_name = (
                MANNA_IMAGES_BUCKET
                if (type and type == "images")
                else MANNA_FILES_BUCKET
            )
            bucket = self.s3.Bucket(bucket_name)
            logging.debug(file.filename)
            logging.debug(file.content_type)
            # upload to aws s3
            bucket.upload_fileobj(
                file.file, file.filename, ExtraArgs={"ACL": "public-read"}
            )
            return f"https://{bucket_name}.s3.amazonaws.com/{file.filename}"
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="invalid type name"
            )
        except Exception as e:
            logging.info(f"Error uploading to S3 bucket: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="error uploading file",
            )

    # delete file from s3
    async def delete_file(self, file_name: str, type: str = "images") -> str:
        try:
            bucket_name = (
                MANNA_IMAGES_BUCKET
                if (type and type == "images")
                else MANNA_FILES_BUCKET
            )
            logging.debug(f"deleting file: {file_name}, from bucket: {bucket_name}")
            # delete file from bucket
            self.s3.Object(bucket_name, file_name).delete()
            return "Ok"
        except Exception as err:
            logging.info(f"Error deleting file from S3 bucket: {str(err)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="error deleting file",
            )
