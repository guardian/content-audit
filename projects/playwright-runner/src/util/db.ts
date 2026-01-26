import * as RDS from "@aws-sdk/rds-signer";
import { PrismaClient } from "../../prisma/client/client.ts";
import { dbTokenExpirySeconds, region } from "./constants.ts";
import { PrismaPg } from "@prisma/adapter-pg";

type DBCredentials = {
  dbHost: string;
  dbName: string;
  dbPassword?: string | undefined;
  dbUser: string;
  dbPort: number;
  isLocal: boolean;
};

export const getPrismaClient = async (dbCredentials: DBCredentials) => {
  const connectionString = await generateConnectionUrl(dbCredentials);

  const expiry = new Promise<void>((res) =>
    setTimeout(res, dbTokenExpirySeconds * 1000),
  );

  const adapter = new PrismaPg(
    {
      connectionString,
    },
    { schema: "public" },
  );

  const client = new PrismaClient({
    log: ["query"],
    adapter,
  });

  return {
    client,
    expiry,
  };
};

export async function generateConnectionUrl({
  dbHost,
  dbName,
  dbPassword,
  dbUser,
  dbPort,
  isLocal,
}: DBCredentials): Promise<string> {
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

  if (!isLocal) {
    url.searchParams.append("sslmode", "verify-ca");
    url.searchParams.append("sslrootcert", "./prisma/root.pem");
  }

  return url.toString();
}

export const generateRdsPassword = async (
  options: RDS.SignerConfig,
): Promise<string> => {
  const signer = new RDS.Signer({ ...options });
  const token = await signer.getAuthToken();
  return encodeURIComponent(token);
};
