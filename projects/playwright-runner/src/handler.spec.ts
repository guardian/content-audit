import test, { it, mock } from "node:test";
import { createHandler } from "./handler.ts";
import type { APIGatewayProxyEvent, Context } from "aws-lambda";
import assert from "node:assert";

test("handler", async () => {
  const mockContext = {} as Context;
  const mockCallback = () => {};
  const getRequest = (body: any): APIGatewayProxyEvent =>
    ({
      body,
      headers: {},
      multiValueHeaders: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
    } as APIGatewayProxyEvent);

  await it("should return a 500 if the audit fails", async () => {
    const errorMessage = "Audit failed";
    const handler = createHandler(
      mock.fn(() => {
        throw new Error(errorMessage);
      })
    );

    const response = await handler(
      getRequest(JSON.stringify({ url: "example.com" })),
      mockContext,
      mockCallback
    );

    const expectedReponse = {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: errorMessage,
      }),
    };

    assert.deepStrictEqual(response, expectedReponse);
  });

  await it("should return a 400 given unparseable JSON as input", async () => {
    const handler = createHandler(mock.fn());

    const response = await handler(
      getRequest("asdf"),
      mockContext,
      mockCallback
    );

    const expectedReponse = {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "Unexpected token 'a', \"asdf\" is not valid JSON",
      }),
    };

    assert.deepStrictEqual(response, expectedReponse);
  });

  await it("should return a 400 given an incorrect payload as input", async () => {
    const handler = createHandler(mock.fn());

    const response = await handler(
      getRequest(JSON.stringify({ incorrect: "input" })),
      mockContext,
      mockCallback
    );

    const responseBody = JSON.parse(response.body);
    const responseMessage = JSON.parse(responseBody.message);

    assert.equal(response.statusCode, 400);
    assert.equal(responseBody.status, "error");
    assert.deepEqual(responseMessage, [
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["url"],
        message: "Required",
      },
    ]);
  });

  await it("should return a 200 if the audit succeeds", async () => {
    const handler = createHandler(mock.fn());

    const response = await handler(
      getRequest(JSON.stringify({ url: "example.com" })),
      mockContext,
      mockCallback
    );

    const expectedReponse = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: "Run complete",
      }),
    };

    assert.deepStrictEqual(response, expectedReponse);
  });
});
