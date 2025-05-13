# Run migrations
docker compose up -d --wait
npm run migrate
docker compose down

# Add the connection string to the .env file read by Prisma for local development
SCRIPT_DIR=$(dirname "$(realpath $0)")
ENV_DIR=$SCRIPT_DIR/../
echo 'DATABASE_URL="postgresql://content-audit:content-audit@localhost:5432/content-audit?schema=public"' > $ENV_DIR/.env