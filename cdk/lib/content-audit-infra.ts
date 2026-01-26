import { GuStack, GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { App } from 'aws-cdk-lib';
import {
	Repository,
	RepositoryEncryption,
	TagMutability,
} from 'aws-cdk-lib/aws-ecr';
import { Key } from 'aws-cdk-lib/aws-kms';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export const EcrNameParamPath = '/INFRA/content-api/content-audit/ecr-name';
export const EcrArnParamPath = '/INFRA/content-api/content-audit/ecr-arn';

export class ContentAuditInfra extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const encryptionKey = new Key(this, 'PlaywrightRunnerKey');

		const ecrRepo = new Repository(this, 'PlaywrightRunnerRepository', {
			repositoryName: `${this.app}/page-runner`,
			encryption: RepositoryEncryption.KMS,
			encryptionKey,
			imageTagMutability: TagMutability.IMMUTABLE,
			imageScanOnPush: true,
			lifecycleRules: [
				{
					description: 'Limit the number of retained images',
					maxImageCount: 100,
				},
			],
		});

		new StringParameter(this, 'EcrArnParam', {
			parameterName: EcrArnParamPath,
			stringValue: ecrRepo.repositoryArn,
		});

		new StringParameter(this, 'EcrNameParam', {
			parameterName: EcrNameParamPath,
			stringValue: ecrRepo.repositoryName,
		});
	}
}
