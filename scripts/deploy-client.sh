#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/

# Required environment variables:
# - BUCKET: S3 bucket name
# - DISTRIBUTION_ID: CloudFront distribution ID
# - API_GATEWAY_STAGE: URL to hit for the lambda functions

if [[ ! -z BUCKET ]]; then
  echo !! Environment variable BUCKET not set !!
  exit
fi

if [[ ! -z DISTRIBUTION_ID ]]; then
  echo !! Environment variable DISTRIBUTION_ID not set !!
  exit
fi

if [[ ! -z API_GATEWAY_STAGE ]]; then
  echo !! Environment variable API_GATEWAY_STAGE not set !!
  exit
fi

cd ../client && npm run build

OUT_DIR=../client/out

aws s3 sync $OUT_DIR s3://$BUCKET/ \
  --delete \
  --exclude $OUT_DIR/sw.js \
  --exclude "*.html" \
  --metadata-directive REPLACE \
  --cache-control max-age=31536000,public \
  --acl public-read

aws s3 cp $OUT_DIR s3://$BUCKET/ \
  --exclude "*" \
  --include "*.html" \
  --include "$OUT_DIR/sw.js" \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --acl public-read \
  --recursive

process_html_file() {
  file_path="$1"
  relative_path="${file_path#$OUT_DIR/}"
  file_name="${relative_path%.html}"

  aws s3 cp s3://$BUCKET/$file_name.html s3://$BUCKET/$file_name
}

find $OUT_DIR -type f -name "*.html" | while read -r html_file; do
  process_html_file "$html_file"
done

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"