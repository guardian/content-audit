#! /bin/bash

# Run migrations
docker compose up -d --wait
npm ci
npm run migrate
docker compose down

SCRIPT_DIR=$(dirname "$(realpath $0)")
ENV_DIR=$SCRIPT_DIR/../

# Add the connection string to the .env file read by Prisma for local development
LOCAL_TEST_HOSTNAME=localhost
LOCAL_DOCKER_HOSTNAME=host.docker.internal

write_env() {
    echo "DATABASE_URL=postgresql://contentaudit:contentaudit@$1:5432/contentaudit?schema=public" > "$2"
}

write_env $LOCAL_TEST_HOSTNAME $ENV_DIR/.env
write_env $LOCAL_DOCKER_HOSTNAME $ENV_DIR/.env-docker
