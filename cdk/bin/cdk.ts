import "source-map-support/register";
import { GuRoot } from "@guardian/cdk/lib/constructs/root";
import { ContentAudit } from "../lib/content-audit";

const app = new GuRoot();
new ContentAudit(app, "ContentAudit-euwest-1-CODE", { app: 'content-audit', stack: "content-api", stage: "CODE", env: { region: "eu-west-1" } });
new ContentAudit(app, "ContentAudit-euwest-1-PROD", { app: 'content-audit', stack: "content-api", stage: "PROD", env: { region: "eu-west-1" } });
