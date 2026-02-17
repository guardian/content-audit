import { generateConnectionUrl, generateRdsPassword } from "../src/util/db.ts";

import {
  DescribeDBProxyEndpointsCommand,
  RDSClient,
} from "@aws-sdk/client-rds";
import { writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const {
  values: { stage: stageArg, help, writeConnectionString },
} = parseArgs({
  options: {
    stage: {
      type: "string",
    },
    writeConnectionString: {
      type: "boolean",
      short: "w",
    },
    help: {
      type: "boolean",
    },
  },
});

if (help) {
  console.log(`write-db-env - write a postgres connection string to the ./env file for the given stage.

If the stage is CODE|PROD, generates an IAM password for authentication, which is valid for a short period.

Usage: node ./write-db-env.ts [--stage local|code|prod]`);
  process.exit(0);
}

const stage = (stageArg ?? "local").toUpperCase();
const validStages = ["LOCAL", "CODE", "PROD"];
if (!validStages.includes(stage)) {
  throw new Error(`Stage must be ${validStages.join(", ")}`);
}

// @todo: this is not yet stage sensitive, as at the time of writing there is no PROD stack.
const generatePasswordForRemoteStack = async (stage: string) => {
  const DBProxyName = `content-audit-proxy-${stage}-fb45`;

  const client = new RDSClient({
    region: "eu-west-1",
    profile: "capi",
  });

  const describeProxiesCmd = new DescribeDBProxyEndpointsCommand({
    DBProxyName,
  });

  const describeProxiesResult = await client.send(describeProxiesCmd);

  const endpoint = describeProxiesResult.DBProxyEndpoints?.[0];

  if (!endpoint || !endpoint?.Endpoint) {
    throw new Error(
      `Missing data for RDS endpoint: ${JSON.stringify({ endpoint })}`,
    );
  }

  return await generateRdsPassword({
    region: "eu-west-1",
    hostname: endpoint.Endpoint,
    port: 5432,
    username: "root",
    profile: "capi",
  });
};

const password =
  stage === "LOCAL"
    ? "contentaudit"
    : await generatePasswordForRemoteStack(stage);

const dbPort = stage === "LOCAL" ? 5432 : 7658;

const dbUser = stage === "LOCAL" ? "contentaudit" : "root";

const connectionUrl = await generateConnectionUrl({
  dbHost: "localhost",
  dbName: "contentaudit",
  dbUser,
  dbPassword: password,
  dbPort,
  includeRootCert: true,
});

writeFileSync(
  `${import.meta.dirname}/../.env`,
  `DATABASE_URL=${connectionUrl}`,
);
