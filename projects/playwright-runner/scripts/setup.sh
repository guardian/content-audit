# Add the connection string to the .env file read by Prisma for local development
echo 'DATABASE_URL="postgresql://content-audit:content-audit@localhost:5432/content-audit?schema=public"' > .env