#! /bin/bash

# Script to put a DB connection string into the local environment to talk to a remote RDS server.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# JQ handles URI-encoding
DB_PASSWORD=$(node "$SCRIPT_DIR/generate-rds-password.ts" | jq -sRr @uri)
DB_USER="root"
DB_PORT=7658
DB_NAME="content-audit"
DB_HOST="localhost"

export DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

printf "%s" "$DATABASE_URL";
