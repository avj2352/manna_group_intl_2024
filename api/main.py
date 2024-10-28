import logging
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from scalar_fastapi import get_scalar_api_reference
# ..custom
from resources.auth import auth_router
from resources.asset import asset_router
from resources.files import files_router
from util.about import config, description


# Create the APP
app = FastAPI(
    title = config.title,
    version = config.version,
    description = description,
    openapi_tags = config.tags_metadata
)

# Allow CORS
ALLOWED_HOSTS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create scalar documentation
@app.get("/scalar", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=str(app.openapi_url),
        title=app.title,        
        dark_mode=True,        
        show_sidebar=True,        
        hide_download_button=False,
        hide_models=False
)

# redirect to swagger docs
@app.get("/", include_in_schema=False)
async def root():
    logging.debug("Redirecting to swagger docs")
    return RedirectResponse(url='/docs')

# flatten payload validations
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
app.include_router(router=auth_router, prefix='/auth', tags=["authentication"])
app.include_router(router=asset_router, prefix='/assets', tags=["assets"])
app.include_router(router=files_router, prefix='/files', tags=["s3"])
