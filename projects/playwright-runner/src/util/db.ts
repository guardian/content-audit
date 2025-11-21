import { Signer, SignerConfig } from "@aws-sdk/rds-signer";
import { Prisma, PrismaClient } from "../../prisma/client/index.js";
import { dbHost, dbUser } from "./env.ts";
import {
  dbMaxConnections,
  dbName,
  dbPort,
  dbQueryTimeout,
  dbSchema,
  dbTokenExpirySeconds,
  region,
} from "./constants.ts";

export const getPrismaClient = async () => {
  const { prismaOptions, expiry } = await generateClientOptions();

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

//...
async function generateClientOptions(): Promise<{
  prismaOptions: Prisma.PrismaClientOptions;
  expiry?: Promise<void>;
}> {
  let password: string;
  let expiry: Promise<void> | undefined;

  password = await generateRdsPassword({
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
    schema: dbSchema,
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

const generateRdsPassword = (options: SignerConfig): Promise<string> => {
  const signer = new Signer(options);
  return signer.getAuthToken();
};
