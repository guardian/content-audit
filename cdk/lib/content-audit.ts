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
} from 'aws-cdk-lib/aws-lambda';
import {
	CfnDBProxy,
	Credentials,
	DatabaseInstanceEngine,
	PostgresEngineVersion,
	StorageType,
} from 'aws-cdk-lib/aws-rds';
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

		const tagOrDigest = process.env['BUILD_NUMBER'] ?? imageTag.valueAsString;

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

		const pageRunnerFunction = new DockerImageFunction(
			this,
			'PageRunnerLambda',
			{
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
			},
		);

		dbProxy.grantConnect(pageRunnerFunction);

		const api = new LambdaRestApi(this, 'PageRunnerApi', {
			handler: pageRunnerFunction,
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
