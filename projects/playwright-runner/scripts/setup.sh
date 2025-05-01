# Add the connection string to the .env file read by Prisma for local development
LOCAL_TEST_HOSTNAME=localhost
LOCAL_DOCKER_HOSTNAME=host.docker.internal

write_env() {
    echo "DATABASE_URL=postgresql://content-audit:content-audit@$1:5432/content-audit?schema=public" > "$2"
}

write_env $LOCAL_TEST_HOSTNAME ".env"
write_env $LOCAL_DOCKER_HOSTNAME ".env-docker"