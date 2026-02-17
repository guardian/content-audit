import { GuStack, GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { App } from 'aws-cdk-lib';
import {
	Repository,
	RepositoryEncryption,
	TagMutability,
} from 'aws-cdk-lib/aws-ecr';
import {
	GuGithubActionsRole,
	GuPolicy,
} from '@guardian/cdk/lib/constructs/iam';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export const EcrNameParamPath = '/INFRA/content-api/content-audit/ecr-name';
export const EcrArnParamPath = '/INFRA/content-api/content-audit/ecr-arn';

export class ContentAuditInfra extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const encryptionKey = new Key(this, 'PageRunnerKey');

		const ecrRepo = new Repository(this, 'PageRunnerRepository', {
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

		// Allow GHA to push new images to ECR
		new GuGithubActionsRole(this, {
			condition: {
				githubOrganisation: 'guardian',
				repositories: 'content-audit:*',
			},
			policies: [
				new GuPolicy(this, 'PushUpdatesPolicy', {
					statements: [
						// Allows the role to push updates to the repo
						new PolicyStatement({
							effect: Effect.ALLOW,
							actions: [
								'ecr:GetDownloadUrlForLayer',
								'ecr:BatchGetImage',
								'ecr:CompleteLayerUpload',
								'ecr:DescribeImages',
								'ecr:DescribeRepositories',
								'ecr:ListTagsForResource',
								'ecr:UploadLayerPart',
								'ecr:ListImages',
								'ecr:InitiateLayerUpload',
								'ecr:BatchCheckLayerAvailability',
								'ecr:PutImage',
							],
							resources: [ecrRepo.repositoryArn, ecrRepo.repositoryArn + '/*'],
						}),
						// Allows the role to obtain login tokens for ECR as a whole
						new PolicyStatement({
							effect: Effect.ALLOW,
							actions: [
								'ecr:DescribeRegistry',
								'ecr:DescribePullThroughCacheRules',
								'ecr:GetAuthorizationToken',
							],
							resources: ['*'],
						}),
					],
				}),
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
