export const getEnvOrThrow = (key: string): string => {
  const value: string | undefined = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};

export const dbHost = getEnvOrThrow("DB_HOST");
export const dbUser = getEnvOrThrow("DB_USER");
export const dbPort = getEnvOrThrow("DB_PORT");
export const dbName = getEnvOrThrow("DB_NAME");
export const dbPassword = process.env.DB_PASSWORD; // Optional for testing purposes