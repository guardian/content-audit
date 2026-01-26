import type { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { AuditPageRequestSchema } from "./model/request.ts";
import { errorResponse, okResponse } from "./util/lambda.ts";
import { type PrismaClient } from "../prisma/client/client.ts";

/**
 * Create the lambda handler. Dependencies are injected for testing purposes.
 */
export const createHandler =
  (
    auditPage: (url: string) => Promise<void>,
    prismaClient: PrismaClient,
  ): Handler<APIGatewayProxyEvent> =>
  async (event) => {
    console.log("`page-runner` started");
    console.log(`Event payload received: ${event.body}`);
    let runId: number | undefined;

    try {
      const eventJson = JSON.parse(event.body ?? "");
      const { url } = AuditPageRequestSchema.parse(eventJson);

      try {
        console.log(`Running page at ${url}`);

        const pageRun = await prismaClient.audit_page_run.create({
          data: { url },
        });
        runId = pageRun.id;

        await auditPage(url);

        await prismaClient.audit_page_run.update({
          where: { id: pageRun.id },
          data: { status: "COMPLETED" },
        });

        return okResponse("Run complete");
      } catch (e) {
        if (runId) {
          await prismaClient.audit_page_run.update({
            where: { id: runId },
            data: { status: "FAILED" },
          });
        } else {
          console.log(
            `Unable to record failure for audit with url ${url}: there was no PENDING record to update`,
          );
        }

        return errorResponse(500, e);
      }
    } catch (e) {
      return errorResponse(400, e);
    } finally {
      prismaClient.$disconnect();
    }
  };
