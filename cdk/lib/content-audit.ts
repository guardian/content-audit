import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuParameter, GuStack } from '@guardian/cdk/lib/constructs/core';
import { CfnOutput, Duration, type App } from 'aws-cdk-lib';
import { Subnet, Vpc } from 'aws-cdk-lib/aws-ec2';
import {
	Repository,
	RepositoryEncryption,
	TagMutability,
} from 'aws-cdk-lib/aws-ecr';
import {
	Effect,
	FederatedPrincipal,
	PolicyDocument,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import {
	Architecture,
	DockerImageCode,
	DockerImageFunction,
} from 'aws-cdk-lib/aws-lambda';

export class ContentAudit extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const vpcId = new GuParameter(this, 'VpcParam', {
			fromSSM: true,
			default: `/account/vpc/primary/id`,
			description: 'Main account VPC',
		});

		const privateSubnetIds = new GuParameter(this, 'PrivateSubnetsParam', {
			fromSSM: true,
			type: 'List<String>',
			default: `/account/vpc/primary/subnets/private`,
			description: 'Private subnets of the deployment VPC',
		});

		const privateSubnets = privateSubnetIds.valueAsList.map((id, ctr) =>
			Subnet.fromSubnetId(this, `private${ctr}`, id),
		);

		const vpc = Vpc.fromVpcAttributes(this, 'Vpc', {
			vpcId: vpcId.valueAsString,
			availabilityZones: ['eu-west-1a', 'eu-west-1b', 'eu-west-1c'],
		});

		const encryptionKey = new Key(this, 'EmbeddingsLambdaKey');

		const ecrRepo = new Repository(this, 'EmbeddingsLambda', {
			repositoryName: 'content-audit/playwright-runner',
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

		ecrRepo.addToResourcePolicy(
			new PolicyStatement({
				effect: Effect.ALLOW,
				principals: [new ServicePrincipal('lambda.amazonaws.com')],
				actions: [
					'ecr:BatchGetImage',
					'ecr:DeleteRepositoryPolicy',
					'ecr:GetDownloadUrlForLayer',
					'ecr:GetRepositoryPolicy',
					'ecr:SetRepositoryPolicy',
				],
				conditions: {
					StringLike: {
						'aws:sourceArn': `arn:aws:lambda:eu-west-1:${scope.account}:function:*`,
					},
				},
			}),
		);

		const ghaRole = new Role(this, 'EmbeddingsLambdaRole', {
			roleName: `recipe-search-backend-GHA`,
			assumedBy: new FederatedPrincipal(
				'token.actions.githubusercontent.com',
				{
					StringEquals: {
						'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
					},
					StringLike: {
						'token.actions.githubusercontent.com:sub':
							'repo:guardian/recipe-search-backend:*',
					},
				},
				'sts:AssumeRoleWithWebIdentity',
			),
			inlinePolicies: {
				'ecr-push': new PolicyDocument({
					statements: [
						//Allows the role to push updates to the repo
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
						//Allows the role to obtain login tokens for ECR as a whole
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
			},
		});

		new DockerImageFunction(this, 'DockerTutorialFunction', {
			code: DockerImageCode.fromEcr(ecrRepo),
			functionName: 'playwright-runner',
			memorySize: 4096,
			timeout: Duration.seconds(60),
			architecture: Architecture.ARM_64,
			vpc,
			vpcSubnets: {
				subnets: privateSubnets,
			},
		});

		new CfnOutput(this, 'OutputRoleArn', {
			value: ghaRole.roleArn,
			description:
				'Role that allows Github Actions to push updates to ECR and access the embedding models',
		});
	}
}
