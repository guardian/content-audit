import * as RDS from "@aws-sdk/rds-signer";
import { Prisma, PrismaClient } from "../../prisma/client/index.js";
import {
  dbMaxConnections,
  dbPort,
  dbQueryTimeout,
  dbSchema,
  dbTokenExpirySeconds,
  region,
} from "./constants.ts";

type DBCredentials = {
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbUser: string;
};

export const getPrismaClient = async (dbCredentials: DBCredentials) => {
  const { prismaOptions, expiry } = await generateClientOptions(dbCredentials);

  console.log(
    `Creating database client with options ${JSON.stringify(
      prismaOptions,
      null,
      "\t"
    )}`
  );

  return {
    client: new PrismaClient({
      log: ["query"],
      ...prismaOptions,
    }),
    expiry,
  };
};

async function generateClientOptions({
  dbHost,
  dbName,
  dbPassword,
  dbUser,
}: DBCredentials): Promise<{
  prismaOptions: Prisma.PrismaClientOptions;
  expiry?: Promise<void>;
}> {
  let password: string;
  let expiry: Promise<void> | undefined;

  password = dbPassword
    ? dbPassword
    : await generateRdsPassword({
        region,
        hostname: dbHost,
        username: dbUser,
        port: dbPort,
      });

  expiry = new Promise((res) => setTimeout(res, dbTokenExpirySeconds * 1000));

  const url = new URL(`postgresql://${dbHost}:${dbPort}/${dbName}`);
  url.username = dbUser;
  url.password = password;
  url.search = new URLSearchParams({
    connection_timeout: dbQueryTimeout.toString(),
    socket_timeout: dbQueryTimeout.toString(),
    connection_limit: dbMaxConnections.toString(),
  }).toString();

  return {
    prismaOptions: {
      datasources: {
        db: {
          url: url.toString(),
        },
      },
    },
    expiry,
  };
}

export const generateRdsPassword = (
  options: RDS.SignerConfig
): Promise<string> => {
  const signer = new RDS.Signer(options);
  return signer.getAuthToken();
};
