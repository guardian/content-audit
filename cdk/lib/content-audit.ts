import {
	GuAutoScalingGroup,
	GuUserData,
} from '@guardian/cdk/lib/constructs/autoscaling';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuAmiParameter,
	GuParameter,
	GuStack,
} from '@guardian/cdk/lib/constructs/core';
import { GuSecurityGroup } from '@guardian/cdk/lib/constructs/ec2';
import { GuLambdaFunction } from '@guardian/cdk/lib/constructs/lambda';
import { GuDatabaseInstance } from '@guardian/cdk/lib/constructs/rds';
import { type App, Duration, Fn, RemovalPolicy } from 'aws-cdk-lib';
import { ApiKeySourceType, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { GroupMetric, GroupMetrics } from 'aws-cdk-lib/aws-autoscaling';
import {
	SubnetType as AWSSubnetType,
	InstanceClass,
	InstanceSize,
	InstanceType,
	Peer,
	Port,
	SecurityGroup,
	Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {
	Architecture,
	DockerImageCode,
	DockerImageFunction,
	Runtime,
} from 'aws-cdk-lib/aws-lambda';
import type { CfnDBProxy } from 'aws-cdk-lib/aws-rds';
import {
	Credentials,
	DatabaseInstanceEngine,
	PostgresEngineVersion,
	StorageType,
} from 'aws-cdk-lib/aws-rds';
import {
	Choice,
	Condition,
	DefinitionBody,
	JsonPath,
	StateMachine,
	Succeed,
} from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Map } from 'aws-cdk-lib/aws-stepfunctions';
import { EcrArnParamPath, EcrNameParamPath } from './content-audit-infra';

interface StackProps extends GuStackProps {
	buildNumber: string;
}

export class ContentAudit extends GuStack {
	constructor(scope: App, id: string, props: StackProps) {
		super(scope, id, props);

		if (!this.app) {
			throw new Error(
				'[ContentAudit]: You must set the `app` property when creating this stack',
			);
		}

		const app = this.app;
		const region = 'eu-west-1';

		const imageTag = new GuParameter(this, 'ImageTag', {
			description:
				'The docker image tag to use. Useful when cloudforming manually - in CI, this is set by BUILD_NUMBER',
			default: props.buildNumber,
		});

		const capiApiKey = new GuParameter(this, 'CapiApiKey', {
			fromSSM: true,
			default: `${this.stage}/${this.stack}/${this.app}/capi/key`,
			description: 'CAPI API Key',
		});

		const capiUrl = new GuParameter(this, 'CapiUrl', {
			fromSSM: true,
			default: `${this.stage}/${this.stack}/${this.app}/capi/url`,
			description: 'CAPI URL',
		});

		const ecrRepoArn = new GuParameter(this, 'EcrArnParam', {
			fromSSM: true,
			default: EcrArnParamPath,
			description: 'The ECR repository ARN for the stack',
		});

		const ecrRepoName = new GuParameter(this, 'EcrNameParam', {
			fromSSM: true,
			default: EcrNameParamPath,
			description: 'The ECR repository name for the stack',
		});

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

		const vpc = Vpc.fromVpcAttributes(this, 'Vpc', {
			vpcId: vpcId.valueAsString,
			availabilityZones: ['ignored'],
			privateSubnetIds: privateSubnetIds.valueAsList,
			publicSubnetIds: publicSubnetIds.valueAsList,
		});

		const ecrRepo = Repository.fromRepositoryAttributes(
			this,
			'PageRunnerRepository',
			{
				repositoryArn: ecrRepoArn.valueAsString,
				repositoryName: ecrRepoName.valueAsString,
			},
		);

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

		const tagOrDigest =
			(process.env['BUILD_NUMBER'] as string | undefined) ??
			imageTag.valueAsString;

		// Database

		const dbPort = 5432;
		const dbUser = 'root';
		const dbSecurityGroupName = `ContentAuditDatabaseSecurityGroup${this.stage}`;
		const dbAccessSecurityGroup = new GuSecurityGroup(this, 'DBSecurityGroup', {
			app,
			description: 'Allow connection from page-runner lambda to DB',
			vpc,
			securityGroupName: dbSecurityGroupName,
		});

		const databaseName = 'contentaudit';
		const db = new GuDatabaseInstance(this, 'RuleManagerRDS', {
			app,
			databaseName,
			vpc,
			vpcSubnets: { subnetType: AWSSubnetType.PRIVATE_WITH_EGRESS },
			allocatedStorage: 50,
			allowMajorVersionUpgrade: false,
			autoMinorVersionUpgrade: true,
			deleteAutomatedBackups: false,
			engine: DatabaseInstanceEngine.postgres({
				version: PostgresEngineVersion.VER_17,
			}),
			iamAuthentication: true,
			instanceType: 'db.t4g.micro',
			instanceIdentifier: `${app}-db-${this.stage}`,
			credentials: Credentials.fromGeneratedSecret(dbUser, {
				secretName: `/${this.stage}/${this.stack}/${app}-credentials-f3b0`,
				excludeCharacters: ',= %+~`#$&*()|[]{}:;<>?!\'/@"\\',
			}),
			multiAz: this.stage === 'PROD',
			port: dbPort,
			preferredMaintenanceWindow: 'Mon:06:30-Mon:07:00',
			storageEncrypted: true,
			storageType: StorageType.GP2,
			removalPolicy: RemovalPolicy.SNAPSHOT,
			devXBackups: { enabled: true },
		});

		const dbSecret = db.secret!;

		const dbProxy = db.addProxy('DatabaseProxy', {
			dbProxyName: `${app}-proxy-${this.stage}-fb45`,
			vpc,
			secrets: [dbSecret],
			iamAuth: true,
			requireTLS: true,
		});
		const cfnDatabaseProxy = dbProxy.node.defaultChild as CfnDBProxy;

		SecurityGroup.fromSecurityGroupId(
			this,
			'databaseProxySecurityGroup',
			Fn.select(0, cfnDatabaseProxy.vpcSecurityGroupIds!),
		).addIngressRule(
			Peer.securityGroupId(dbAccessSecurityGroup.securityGroupId),
			Port.tcp(dbPort),
			`Allow ${dbSecurityGroupName} to connect to the ${dbProxy.dbProxyName}`,
		);

		const dbHostname = dbProxy.endpoint;

		// Page runner lambda - runs the webpage at the given url

		const pageRunnerLambda = new DockerImageFunction(this, 'PageRunnerLambda', {
			code: DockerImageCode.fromEcr(ecrRepo, { tagOrDigest }),
			functionName: 'page-runner',
			memorySize: 4096,
			timeout: Duration.seconds(60),
			architecture: Architecture.ARM_64,
			vpc,
			securityGroups: [dbAccessSecurityGroup],
			environment: {
				DB_USER: dbUser,
				DB_HOST: dbHostname,
				DB_NAME: databaseName,
				DB_PORT: dbPort.toString(),
			},
		});

		dbProxy.grantConnect(pageRunnerLambda);

		// CAPI Query Lambda - fetches the next content page

		const capiQueryLambda = new GuLambdaFunction(this, 'CapiQueryLambda', {
			app: 'capi-query',
			functionName: 'capi-query',
			fileName: 'index.js',
			runtime: Runtime.NODEJS_22_X,
			handler: 'index.handler',
			memorySize: 128,
			vpc,
			environment: {
				CAPI_API_KEY: capiApiKey.valueAsString,
				CAPI_URL: capiUrl.valueAsString,
			},
		});

		// Step Function

		const getNextContentPage = new LambdaInvoke(this, 'GetNextContentPage', {
			lambdaFunction: capiQueryLambda,
			outputPath: '$.Payload',
		});

		const auditPiece = new LambdaInvoke(this, 'AuditPiece', {
			lambdaFunction: pageRunnerLambda,
			outputPath: '$.Payload',
		});

		const mapAudit = new Map(this, 'ProcessItemsInParallel', {
			maxConcurrency: 10,
			itemsPath: JsonPath.stringAt('$.items'),
			parameters: {
				'id.$': '$$.Map.Item.Value.id',
				'data.$': '$$.Map.Item.Value.data',
			},
		});

		mapAudit.itemProcessor(auditPiece);

		const done = new Succeed(this, 'Done');

		const morePages = new Choice(this, 'MorePages')
			.when(Condition.booleanEquals('$.hasMorePages', true), getNextContentPage)
			.otherwise(done);

		const definition = getNextContentPage.next(mapAudit).next(morePages);

		new StateMachine(this, 'ContentAuditStateMachine', {
			stateMachineName: `${app}-state-machine-${this.stage}`,
			definitionBody: DefinitionBody.fromChainable(definition),
		});

		// API

		const api = new LambdaRestApi(this, 'PageRunnerApi', {
			handler: pageRunnerLambda,
			apiKeySourceType: ApiKeySourceType.HEADER,
			defaultMethodOptions: {
				apiKeyRequired: true,
			},
		});

		const usagePlan = api.addUsagePlan('PageRunnerUsagePlan', {
			name: 'PageRunnerUsagePlan',
		});

		usagePlan.addApiStage({
			stage: api.deploymentStage,
		});

		// Database bastion

		const dbBastionASGName = `${app}-bastion-${this.stage}`;
		const dbBastionASG = new GuAutoScalingGroup(this, 'DatabaseBastionASG', {
			vpc,
			app,
			autoScalingGroupName: dbBastionASGName,
			instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.NANO),
			groupMetrics: [new GroupMetrics(GroupMetric.IN_SERVICE_INSTANCES)],
			allowAllOutbound: false,
			minimumInstances: 0,
			maximumInstances: 1,
			additionalSecurityGroups: [dbAccessSecurityGroup],
			imageId: new GuAmiParameter(this, { app }),
			userData: new GuUserData(this, {
				app,
				distributable: {
					fileName: 'cdk/startup.sh',
					executionStatement: `bash /${app}/cdk/startup.sh ${dbBastionASGName} ${region}`,
				},
			}).userData,
			imageRecipe: 'rds-bastion-jammy',
		});

		dbProxy.grantConnect(dbBastionASG);
		dbBastionASG.addToRolePolicy(
			// allow the instance to effectively terminate itself by reducing the capacity of the ASG that controls it
			new PolicyStatement({
				effect: Effect.ALLOW,
				actions: ['autoscaling:SetDesiredCapacity'],
				resources: [
					`arn:aws:autoscaling:${region}:${this.account}:*/${dbBastionASGName}`, // unfortunately can't use the databaseBastionASG.autoScalingGroupArn property as it's circular
				],
			}),
		);
	}
}
