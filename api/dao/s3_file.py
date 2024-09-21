'''
AWS S3 File Service
Used for create, update, read, delete of AWS S3 files.
Requires the S3 bucket to be created in AWS and it's name...
...configured in Envronment files
'''
from typing import List
from fastapi import HTTPException, UploadFile, status
import logging
import boto3
# custom
from util.env_config import SERVICE_NAME, REGION_NAME, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BROCHURE_BUCKET, S3_CERTIFICATE_BUCKET

class FileService:
    def __init__(self):
        self.s3 = boto3.resource(
                service_name=SERVICE_NAME,
                region_name=REGION_NAME,
                aws_access_key_id=S3_ACCESS_KEY,
                aws_secret_access_key=S3_SECRET_KEY
        )

    # upload to remote s3
    async def upload_file(self, file: UploadFile, type: str = 'gallery') -> str:
        try:            
            bucket_name = S3_CERTIFICATE_BUCKET if (type and type == "certificate") else S3_BROCHURE_BUCKET            
            bucket = self.s3.Bucket(bucket_name)
            logging.debug(file.filename)
            logging.debug(file.content_type)    
            # upload to aws s3
            bucket.upload_fileobj(file.file, file.filename, ExtraArgs={"ACL": "public-read"})
            return f"https://{bucket_name}.s3.amazonaws.com/{file.filename}"            
        except Exception as e:
            logging.debug(f"Error uploading to S3 bucket: {str(e)}")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="error uploading file")

    # delete file from s3
    async def delete_file(self, file_name: str, type:str = 'brochure') -> str:
        try:
            bucket_name = S3_CERTIFICATE_BUCKET if (type and type == "certificate") else S3_BROCHURE_BUCKET            
            logging.debug(f"deleting file: {file_name}, from bucket: {bucket_name}")
            # delete file from bucket
            self.s3.Object(bucket_name, file_name).delete()
            return "Ok"         
        except Exception as err:
            logging.debug(f"Error deleting file from S3 bucket: {str(e)}")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="error deleting file")
        
    async def list_s3_files(self, bucket_name: str) -> List:
        s3_client = boto3.client('s3')
        # Initialize variables
        files = []
        continuation_token = None
    
        while True:
            # Prepare the list_objects_v2 parameters
            list_params = {
                'Bucket': bucket_name,
                'MaxKeys': 1000  # Adjust as needed
            }
        
            # If there's a continuation token, include it
            if continuation_token:
                list_params['ContinuationToken'] = continuation_token
        
            # Make the list_objects_v2 call
            response = s3_client.list_objects_v2(**list_params)
        
            # Process the contents
            if 'Contents' in response:
                for obj in response['Contents']:
                    files.append(obj['Key'])
            
            # Check if there are more objects to fetch
            if not response.get('IsTruncated'):  # No more files
                break
            
            # Get the continuation token for the next call
            continuation_token = response.get('NextContinuationToken')
        
        return files