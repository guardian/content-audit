import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuParameter,
	GuStack,
} from '@guardian/cdk/lib/constructs/core';
import { GuSecurityGroup } from '@guardian/cdk/lib/constructs/ec2';
import {
	GuGithubActionsRole,
	GuPolicy,
} from '@guardian/cdk/lib/constructs/iam';
import { Duration, RemovalPolicy, type App } from 'aws-cdk-lib';
import { ApiKeySourceType, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { GuDatabaseInstance } from '@guardian/cdk/lib/constructs/rds';
import {
	Port,
	Subnet,
	SubnetType as AWSSubnetType,
	Vpc,
} from 'aws-cdk-lib/aws-ec2';
import {
	Repository,
	RepositoryEncryption,
	TagMutability,
} from 'aws-cdk-lib/aws-ecr';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import {
	Architecture,
	DockerImageCode,
	DockerImageFunction,
} from 'aws-cdk-lib/aws-lambda';
import {
	Credentials,
	DatabaseInstanceEngine,
	PostgresEngineVersion,
	StorageType,
} from 'aws-cdk-lib/aws-rds';

export class ContentAudit extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		if (!this.app) {
			throw new Error(
				'[ContentAudit]: You must set the `app` property when creating this stack',
			);
		}

		const app = this.app;

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
		const publicSubnetIds = new GuParameter(this, 'PublicSubnetsParam', {
			fromSSM: true,
			type: 'List<String>',
			default: `/account/vpc/primary/subnets/public`,
			description: 'Public subnets of the deployment VPC',
		});

		const privateSubnets = privateSubnetIds.valueAsList.map((id, ctr) =>
			Subnet.fromSubnetId(this, `private${ctr}`, id),
		);

		const vpc = Vpc.fromVpcAttributes(this, 'Vpc', {
			vpcId: vpcId.valueAsString,
			availabilityZones: ['ignored'],
			privateSubnetIds: privateSubnetIds.valueAsList,
			publicSubnetIds: publicSubnetIds.valueAsList,
		});

		const encryptionKey = new Key(this, 'PlaywrightRunnerKey');

		const ecrRepo = new Repository(this, 'PlaywrightRunnerRepository', {
			repositoryName: `${this.app}/playwright-runner`,
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

		const tagOrDigest = process.env['BUILD_NUMBER'] ?? 'DEV';

		const dbPort = 5432;
		const dbUser = 'root';

		const dbAccessSecurityGroup = new GuSecurityGroup(this, 'DBSecurityGroup', {
			app: app,
			description: 'Allow connection from playwright-runner lambda to DB',
			vpc,
			allowAllOutbound: false,
		});

		dbAccessSecurityGroup.addIngressRule(
			dbAccessSecurityGroup,
			Port.tcp(dbPort),
		);

		const db = new GuDatabaseInstance(this, 'RuleManagerRDS', {
			app: app,
			databaseName: `contentaudit`, // Only alphanumeric characters :'(
			vpc,
			vpcSubnets: { subnetType: AWSSubnetType.PRIVATE_WITH_EGRESS },
			allocatedStorage: 50,
			allowMajorVersionUpgrade: false,
			autoMinorVersionUpgrade: true,
			deleteAutomatedBackups: false,
			engine: DatabaseInstanceEngine.postgres({
				version: PostgresEngineVersion.VER_17,
			}),
			instanceType: 'db.t4g.micro',
			instanceIdentifier: `${app}-db-${this.stage}`,
			credentials: Credentials.fromGeneratedSecret(dbUser, {
				secretName: `${app}-master-credentials`,
			}),
			multiAz: this.stage === 'PROD',
			port: dbPort,
			preferredMaintenanceWindow: 'Mon:06:30-Mon:07:00',
			securityGroups: [dbAccessSecurityGroup],
			storageEncrypted: true,
			storageType: StorageType.GP2,
			removalPolicy: RemovalPolicy.SNAPSHOT,
			devXBackups: { enabled: true },
		});

		const dbSecret = db.secret!;

		const dbProxy = db.addProxy('DatabaseProxy', {
			dbProxyName: `${app}-proxy-${this.stage}`,
			vpc,
			vpcSubnets: { subnetType: AWSSubnetType.PUBLIC },
			secrets: [dbSecret],
			iamAuth: true,
			requireTLS: true,
			securityGroups: [dbAccessSecurityGroup],
		});

		const dbHostname = dbProxy.endpoint;

		const playwrightRunnerFunction = new DockerImageFunction(
			this,
			'PlaywrightRunnerLambda',
			{
				code: DockerImageCode.fromEcr(ecrRepo, { tagOrDigest }),
				functionName: 'playwright-runner',
				memorySize: 4096,
				timeout: Duration.seconds(60),
				architecture: Architecture.ARM_64,
				vpc,
				vpcSubnets: {
					subnets: privateSubnets,
				},
				environment: {
					DATABASE_URL: `postgresql://${dbUser}:${dbSecret.secretValue}@${dbHostname}:${dbPort}/${this.app}?schema=public`,
				},
			},
		);

		dbProxy.grantConnect(playwrightRunnerFunction);

		dbAccessSecurityGroup.connections.allowFrom(
			playwrightRunnerFunction,
			Port.tcp(dbPort),
			'Allow connection from playwright-runner lambda to DB',
		);

		const api = new LambdaRestApi(this, 'PlaywrightRunnerApi', {
			handler: playwrightRunnerFunction,
			apiKeySourceType: ApiKeySourceType.HEADER,
			defaultMethodOptions: {
				apiKeyRequired: true,
			},
		});

		const usagePlan = api.addUsagePlan('PlaywrightRunnerUsagePlan', {
			name: 'PlaywrightRunnerUsagePlan',
		});

		usagePlan.addApiStage({
			stage: api.deploymentStage,
		});
	}
}
