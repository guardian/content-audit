#! /bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

DB_HOST="localhost"
export DB_HOST

DB_PASSWORD=$(node "$SCRIPT_DIR/generate-rds-password.ts")
export DB_PASSWORD

export DB_USER="content-audit"
export DB_PORT=7658
export DB_NAME="content-audit"
