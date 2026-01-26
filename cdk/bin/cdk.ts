import 'source-map-support/register';
import { GuRoot } from '@guardian/cdk/lib/constructs/root';
import { ContentAudit } from '../lib/content-audit';

const app = new GuRoot();

const buildNumber = process.env['BUILD_NUMBER'];

if (!buildNumber) {
    throw new Error("You must provide a build number when creating the stack");
}

new ContentAudit(app, 'ContentAudit-euwest-1-CODE', {
	app: 'content-audit',
	stack: 'content-api',
	stage: 'CODE',
	buildNumber,
	env: { region: 'eu-west-1' },
});
new ContentAudit(app, 'ContentAudit-euwest-1-PROD', {
	app: 'content-audit',
	stack: 'content-api',
	stage: 'PROD',
	buildNumber,
	env: { region: 'eu-west-1' },
});
