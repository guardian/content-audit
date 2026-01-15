import * as RDS from "@aws-sdk/rds-signer";
import { PrismaClient } from "../../prisma/client/client.ts";
import {
  dbMaxConnections,
  dbQueryTimeout,
  dbTokenExpirySeconds,
  region,
} from "./constants.ts";
import { PrismaPg } from "@prisma/adapter-pg";

type DBCredentials = {
  dbHost: string;
  dbName: string;
  dbPassword?: string | undefined;
  dbUser: string;
  dbPort: number;
};

export const getPrismaClient = async (dbCredentials: DBCredentials) => {
  console.log("Generating connection url");
  const { adapter, expiry } = await generateConnectionUrl(dbCredentials);

  console.log("Creating database client");

  const client = new PrismaClient({
    log: ["query"],
    adapter,
  });

  console.log("Client created");

  return {
    client,
    expiry,
  };
};

async function generateConnectionUrl({
  dbHost,
  dbName,
  dbPassword,
  dbUser,
  dbPort,
}: DBCredentials): Promise<{
  adapter: PrismaPg;
  expiry?: Promise<void>;
}> {
  const expiry = new Promise<void>((res) => setTimeout(res, dbTokenExpirySeconds * 1000));
  const password = dbPassword
    ? dbPassword
    : await generateRdsPassword({
        region,
        hostname: dbHost,
        username: dbUser,
        port: dbPort,
      });

  const url = new URL(`postgresql://${dbHost}:${dbPort}/${dbName}`);
  url.username = dbUser;
  url.password = password;

  console.log({password});

  console.log(url.toString());

  const adapter = new PrismaPg({
    connectionString: url.toString(),
  });

  return {
    adapter,
    expiry,
  };
}

export const generateRdsPassword = async (
  options: RDS.SignerConfig
): Promise<string> => {
  const signer = new RDS.Signer({ ...options });
  const token = await signer.getAuthToken();
  return encodeURIComponent(token);
};
