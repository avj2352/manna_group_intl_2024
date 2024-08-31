import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AppDnsStack } from "../lib/dns/dns-stack";
import { AppSiteStack } from "../lib/site/site-stack";

test(`Expect Stack to contain -
    1 HostedZone,
    1 S3 bucket
    1 CloudFront Distribution`, () => {
  // ARRANGE
  const app = new cdk.App();
  // ACT
  const dnsStack = new AppDnsStack(app, "MyTestDnsStack", {
    env: { account: "533935803992", region: "us-east-1" },
    apexDomain: "test.com",
  });

  const uiStack = new AppSiteStack(app, "MyTestStack", {
    env: { account: "533935803992", region: "us-east-1" },
    dnsName: "testdomain.com",
    hostedZone: dnsStack.hostedZone,
    certificate: dnsStack.certificate,
  });

  const dnsTemplate = Template.fromStack(dnsStack);
  const uiTemplate = Template.fromStack(uiStack);

  // ASSERT - DNS Stack
  dnsTemplate.resourceCountIs("AWS::Route53::HostedZone", 1);

  // ASSERT - Site Stack
  uiTemplate.resourceCountIs("AWS::S3::Bucket", 1);
  uiTemplate.resourceCountIs("AWS::CloudFront::Distribution", 1);
});
