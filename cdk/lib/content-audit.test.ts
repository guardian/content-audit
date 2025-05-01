import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { ContentAudit } from "./content-audit";

describe("The ContentAudit stack", () => {
  it("matches the snapshot", () => {
    const app = new App();
    const stack = new ContentAudit(app, "ContentAudit", { app: 'content-audit', stack: "content-api", stage: "TEST" });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
