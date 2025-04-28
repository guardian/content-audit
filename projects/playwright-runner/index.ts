import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { AuditPageOptionsSchema } from "./model.js";
import { auditPage } from "./audit.js";
import { errorResponse, okResponse } from "./utils.js";

export const handler: Handler<APIGatewayProxyEvent> = async (event) => {
  console.log("`playwright-runner` started");
  console.log(`Event payload received: ${event.body}`);

  try {
    const eventJson = JSON.parse(event.body ?? "");
    const { url } = AuditPageOptionsSchema.parse(eventJson);

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
