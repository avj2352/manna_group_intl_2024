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
from resources.product import product_router
from resources.promotion import promo_router
from util.about import config, description
# migration
from dao.sql_alchemy_models import init


# Create the APP
app = FastAPI(
    title = config.title,
    version = config.version,
    description = description,
    openapi_tags = config.tags_metadata
)

# migration - create tables
init()

# logging config
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s[%(filename)s:%(lineno)s-%(funcName)s()]-%(message)s",
    datefmt="%Y-%m-%d %H:%M:%S")
# Allow CORS
ALLOWED_HOSTS = ["*"]

# add module name in log outputs
logger = logging.getLogger(__name__)

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
    logger.debug("Redirecting to scalar swagger docs")
    return RedirectResponse(url='/scalar')

# flatten payload validations
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
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
app.include_router(router=product_router, prefix='/products', tags=["products"])
app.include_router(router=promo_router, prefix='/promotions', tags=["promotions"])
app.include_router(router=files_router, prefix='/files', tags=["s3"])


# message = "8 Tulip drive"
# encrypted = encrypt_message(message=message, key=APP_KEY)
# decrypted = decrypt_message(encrypted_message=encrypted, key=APP_KEY)
# print(f"Encrpyted: {encrypted}")
# print(f"Decrypted: {decrypted}")

