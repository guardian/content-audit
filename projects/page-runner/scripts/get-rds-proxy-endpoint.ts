import {
  DescribeDBProxyEndpointsCommand,
  RDSClient,
} from "@aws-sdk/client-rds";
import { parseArgs } from "node:util";

const {
  values: { stage: stageArg, help },
} = parseArgs({
  options: {
    stage: {
      type: "string",
    },
    help: {
      type: "boolean"
    }
  },
});

if (help) {
  console.log(`get-rds-proxy-endpoint - get the project's rds proxy endpoint for a given stage

Usage: node ./get-rds-proxy-endpoint.ts [--stage CODE|PROD]
    `);
  process.exit(0);
}

const stage = stageArg ?? "CODE";

const DBProxyName = `content-audit-proxy-${stage}-fb45`;

const client = new RDSClient({
  region: "eu-west-1",
  profile: "capi"
});

const describeProxiesCmd = new DescribeDBProxyEndpointsCommand({
  DBProxyName,
});

const describeProxiesResult = await client.send(describeProxiesCmd);

const endpoint = describeProxiesResult.DBProxyEndpoints?.[0].Endpoint;

if (!endpoint) {
  throw new Error(`Could not find endpoint for proxy name: ${DBProxyName}`);
}

console.log(endpoint);