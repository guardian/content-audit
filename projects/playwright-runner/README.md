# playwright-runner

A lambda that runs a web page in [playwright](https://playwright.dev/). It will eventually store information about that page for analysis.

Runs in a Docker image.

## Running locally

The easiest way to work on code locally is likely to run the tests, which do not require a Docker environment to run:

```
npm run test

# Or, if you'd like them to run on every change:
npm run test:watch
```

Tests are written with Node's [test runner.](https://nodejs.org/api/test.html)

You can also run the code in a simulated lambda environment. When running outside a lambda environment, the Docker container will use [aws-lambda-runtime-interface-emulator](https://github.com/aws/aws-lambda-runtime-interface-emulator) (`aws-rie`) to provide a local endpoint that will invoke the code as a lambda would.

First, build and run the docker image —

```
# Build a docker image, tagged with `playwright-runner:latest`
docker build -t playwright-runner:latest .

# Run a container using `playwright-runner:latest`, removing the container when
# it is stopped, and binding local port 6789 to port 8080 in the container
docker run --rm -ti  -p 6789:8080 playwright-runner:latest
```

Then, `POST` a request to the endpoint exposed by `aws-rie`. Note that the payload should be what we'd expect from [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format): JSON with a `body` field that contains a JSON string representing the data we're sending to the lambda.

```
BODY='{"body": "{\"url\": \"https://www.theguardian.com/about\"}"}'
curl -XPOST "localhost:6789/2015-03-31/functions/function/invocations" -d "$BODY"
```
