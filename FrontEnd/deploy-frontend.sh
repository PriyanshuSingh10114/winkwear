#!/bin/bash

set -e

echo "🚀 Pulling latest code..."
git pull origin main

echo "📦 Installing deps..."
npm install

echo "🏗 Building project..."
npm run build

echo "🧹 Cleaning S3..."
aws s3 rm s3://winkandwear-s3-bucket --recursive

echo "☁ Uploading to S3..."
aws s3 sync dist/ s3://winkandwear-s3-bucket --delete

echo "🧠 Fixing index.html cache..."
aws s3 cp dist/index.html s3://winkandwear-s3-bucket/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

echo "🔥 Invalidating CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id E17LGT9CFW9S88 \
  --paths "/*"

echo "✅ Deployment complete!"
