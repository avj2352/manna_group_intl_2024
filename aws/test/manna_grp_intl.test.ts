import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AppSiteStack } from "../lib/site/site-stack";
// example test. To run these tests, uncomment this file along with the
// example resource in lib/manna_grp_intl-stack.ts
describe("Resource Created", () => {
  // ..test cloudfront
  test(`Expect cloudfront distribution to contain -
      1 S3 bucket,
      1 Cloudfront Distribution,
      1 Lambdas
    `, () => {
    const app = new cdk.App();

    const uiStack = new AppSiteStack(app, "MyTestAppSiteStack", {
      env: { account: "544935803992", region: "us-east-1" },
    });

    const uiTemplate = Template.fromStack(uiStack);

    // ..assert tests
    uiTemplate.resourceCountIs("AWS::S3::Bucket", 1);
    uiTemplate.resourceCountIs("AWS::CloudFront::Distribution", 1);
    uiTemplate.resourceCountIs("AWS::Lambda::Function", 1);
  });
});
