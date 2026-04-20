#! /bin/bash

# Run migrations

echo "[Setup]: writing env files"

SCRIPT_DIR=$(dirname "$(realpath "$0")")
ENV_DIR=$SCRIPT_DIR/../

# Add the connection string to the .env file read by Prisma for local development
LOCAL_TEST_HOSTNAME=localhost
LOCAL_DOCKER_HOSTNAME=host.docker.internal

write_env() {
    echo "DATABASE_URL=postgresql://contentaudit:contentaudit@$1:5432/contentaudit?schema=public" > "$2"
}

write_env $LOCAL_TEST_HOSTNAME "$ENV_DIR/.env"
write_env $LOCAL_DOCKER_HOSTNAME "$ENV_DIR/.env-docker"

echo "[Setup]: running containers"

docker compose up -d --wait

echo "[Setup]: installing dependencies"

npm ci

echo "[Setup]: migrating DB"

npm run migrate:create

echo "[Setup]: complete"