import type { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { AuditPageRequestSchema } from "./model/request.ts";
import { errorResponse, okResponse } from "./util/lambda.ts";
import { PrismaClient } from "@prisma/client";

/**
 * Create the lambda handler. Dependencies are injected for testing purposes.
 */
export const createHandler =
  (
    auditPage: (url: string) => Promise<void>,
    prismaClient: PrismaClient
  ): Handler<APIGatewayProxyEvent> =>
  async (event) => {
    console.log("`playwright-runner` started");
    console.log(`Event payload received: ${event.body}`);

    // Temporary until we add working DB code to test the connection
    try {
      const count = await prismaClient.audit_page_run.count();
      console.log(`Current run count: ${count} (should be 0!)`);
    } catch (e) {
      console.error(e);
      return errorResponse(500, e);
    }

    try {
      const eventJson = JSON.parse(event.body ?? "");
      const { url } = AuditPageRequestSchema.parse(eventJson);

      try {
        console.log(`Running page at ${url}`);
        await auditPage(url);

        return okResponse("Run complete");
      } catch (e) {
        return errorResponse(500, e);
      }
    } catch (e) {
      return errorResponse(400, e);
    } finally {
      prismaClient.$disconnect();
    }
  };
