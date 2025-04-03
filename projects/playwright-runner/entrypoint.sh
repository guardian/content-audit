#!/bin/sh
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
  NODE_VERSION=$(node -v)
  printf "Running in emulator on node $NODE_VERSION\n"

  exec /usr/local/bin/aws-lambda-rie /usr/bin/npx aws-lambda-ric $1
else
  printf "Running in lambda on node $NODE_VERSION\n"
  exec /usr/bin/npx aws-lambda-ric $1
fi