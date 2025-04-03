import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { Duration, type App } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';

export class ContentAudit extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const EcrRepo = new Repository(this, 'content-audit-ecr-repo', {
			repositoryName: 'content-audit/playwright-runner',
		});

		new DockerImageFunction(this, 'DockerTutorialFunction', {
			code: DockerImageCode.fromEcr(EcrRepo),
			functionName: 'playwright-runner',
			memorySize: 4096,
			timeout: Duration.seconds(60),
		});
	}
}
