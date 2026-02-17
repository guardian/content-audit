import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ContentAuditInfra } from './content-audit-infra';

describe('The ContentAudit stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new ContentAuditInfra(app, 'ContentAuditinfra', {
			app: 'content-audit',
			stack: 'content-api',
			stage: 'TEST',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
