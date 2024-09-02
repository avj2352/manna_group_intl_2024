source ./venv/bin/Activate
# auth0
export AUTH0_DOMAIN=dev-p2wsfw6h.us.auth0.com
export AUTH0_AUDIENCE=https://timerapi.pramod-profile.net

# database
export SQL_CONN=postgres://postgres:XBuKcBBmZmkPM45@localhost:5432
export DB_NAME=time_travel_dev
export MAX_DB_CONN=10

# aws related
export SERVICE_NAME=s3
export REGION_NAME=us-east-1
export S3_ACCESS_KEY=AKIA6BIZZT273UFVXOZ7
export S3_SECRET_KEY=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
export S3_BROCHURE_BUCKET=pmin-brochure-bucket
export S3_CERTIFICATE_BUCKET=pmin-certificate-bucket

# server
python3 -m uvicorn main:app --reload