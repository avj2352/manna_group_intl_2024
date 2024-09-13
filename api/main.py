import os
import logging
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# ..custom
# from resources.auth import auth


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

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    custom_errors = []
    for error in errors:
        field = "-".join(str(x) for x in error['loc'])
        msg = error["msg"]
        custom_errors.append({"field": field, "message": msg})
    return JSONResponse(
        status_code=400,
        content={
            "detail": "Validation Error",
            "message": custom_errors
        }
    )


# add routes
# app.mount('/auth', auth)
