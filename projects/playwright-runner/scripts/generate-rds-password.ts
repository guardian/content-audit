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
  console.log(`generate-rds-password - generate an IAM password for the RDS proxy for a given stage

Usage: node ./generate-rds-password.ts [--stage CODE|PROD] [-i, --include-connection-string]`);
  process.exit(0);
}

const stage = stageArg ?? "CODE";

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

const password = await generateRdsPassword({
  region: "eu-west-1",
  hostname: endpoint.Endpoint,
  port: 5432,
  username: "root",
  profile: "capi",
});

process.stdout.write(password);

if (writeConnectionString) {
  const connectionUrl = await generateConnectionUrl({
    dbHost: "localhost",
    dbName: "contentaudit",
    dbUser: "root",
    dbPassword: password,
    dbPort: 7658,
    isLocal: true,
  });

  writeFileSync(
    `${import.meta.dirname}/../.env`,
    `DATABASE_URL=${connectionUrl}`,
  );
}
