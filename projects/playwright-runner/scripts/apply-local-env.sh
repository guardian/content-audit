#! /bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo $SCRIPT_DIR;

DB_HOST=$(node "$SCRIPT_DIR/get-rds-proxy-endpoint.ts")
export DB_HOST

DB_PASSWORD=$(node "$SCRIPT_DIR/generate-rds-password.ts")
export DB_PASSWORD

export DB_USER="content-audit"
export DB_PORT=7658
export DB_NAME="content-audit"

