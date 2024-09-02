import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# logging configuration
logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s ~%(filename)s~ %(levelname)s:-%(message)s",
        datefmt="%Y-%m-%d %H:%M:%S")


# Create the APP
app = FastAPI()

# Allow CORS
ALLOWED_HOSTS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# root api, with swagger doc links
@app.get('/')
async def root():
    return {
        "health": "OK",
        "version": "0.1.0",
        "swagger": {
            "auth": "/auth/docs",            
            "assets": "/assets/docs",
        }
    }