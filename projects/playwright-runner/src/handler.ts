import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { AuditPageRequestSchema } from "./model/request.ts";
import { errorResponse, okResponse } from "./util/lambda.ts";

/**
 * Create the lambda handler. Dependencies are injected for testing purposes.
 */
export const createHandler =
  (auditPage: (url: string) => Promise<void>): Handler<APIGatewayProxyEvent> =>
  async (event) => {
    console.log("`playwright-runner` started");
    console.log(`Event payload received: ${event.body}`);

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
    }
  };
