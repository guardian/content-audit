import type { GuStackProps } from "@guardian/cdk/lib/constructs/core";
import { GuStack } from "@guardian/cdk/lib/constructs/core";
import type { App } from "aws-cdk-lib";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";

export class ContentAudit extends GuStack {
  constructor(scope: App, id: string, props: GuStackProps) {
    super(scope, id, props);

    new DockerImageFunction(this, 'DockerTutorialFunction', {
      code: DockerImageCode.fromImageAsset("../../projects/playwright-runner"),
      functionName: 'playwright-runner',
    });
  }
}
