import * as RDS from "@aws-sdk/rds-signer";
import { PrismaClient } from "../../prisma/client/client.ts";
import { dbTokenExpirySeconds, region } from "./constants.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import os from "os";

let userInfo = os.userInfo();
console.log("User info:", userInfo);
// Root user uid will always be 0
if (userInfo.uid === 0) {
  console.log("User is root.");
}

type DBCredentials = {
  dbHost: string;
  dbName: string;
  dbPassword?: string | undefined;
  dbUser: string;
  dbPort: number;
  isLocal: boolean;
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
  isLocal,
}: DBCredentials): Promise<{
  adapter: PrismaPg;
  expiry?: Promise<void>;
}> {
  const expiry = new Promise<void>((res) =>
    setTimeout(res, dbTokenExpirySeconds * 1000),
  );
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

  console.log({ password });

  console.log(url.toString());

  const adapter = new PrismaPg(
    {
      connectionString: url.toString(),
      password: "",
    },
    { schema: "public" },
  );

  return {
    adapter,
    expiry,
  };
}

export const generateRdsPassword = async (
  options: RDS.SignerConfig,
): Promise<string> => {
  const signer = new RDS.Signer({ ...options });
  const token = await signer.getAuthToken();
  return encodeURIComponent(token);
};
