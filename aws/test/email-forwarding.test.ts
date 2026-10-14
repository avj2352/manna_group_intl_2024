import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AppDnsStack } from "../lib/dns/dns-stack";
import { EmailForwardingStack } from "../lib/email/email-forwarding-stack";
import { EMAIL_ALIASES } from "../lib/email/email-aliases";

test(`Expect EmailForwardingStack to contain -
    1 SES Email Identity,
    4 Route53 RecordSets (1 MX + 3 DKIM CNAMEs),
    1 S3 Bucket + 1 Bucket Policy,
    2 Lambda Functions (1 forwarder + 1 auto-delete handler),
    1 SES Receipt Rule Set + 1 Receipt Rule,
    2 IAM Roles + 1 IAM Policy`, () => {
  // ARRANGE
  const app = new cdk.App();

  const dnsStack = new AppDnsStack(app, "TestDnsStack", {
    env: { account: "533935803992", region: "us-east-1" },
    apexDomain: "test.com",
  });

  // ACT
  const emailStack = new EmailForwardingStack(app, "TestEmailStack", {
    env: { account: "533935803992", region: "us-east-1" },
    hostedZone: dnsStack.hostedZone,
    apexDomain: "test.com",
    emailAliases: EMAIL_ALIASES,
  });

  const template = Template.fromStack(emailStack);

  // ASSERT - SES Email Identity (domain verification + DKIM)
  template.resourceCountIs("AWS::SES::EmailIdentity", 1);

  // ASSERT - Route53 RecordSets (1 MX + 3 DKIM CNAMEs)
  template.resourceCountIs("AWS::Route53::RecordSet", 4);

  // ASSERT - S3 Bucket + Bucket Policy
  template.resourceCountIs("AWS::S3::Bucket", 1);
  template.resourceCountIs("AWS::S3::BucketPolicy", 1);

  // ASSERT - Lambda Functions (forwarder + auto-delete objects handler)
  template.resourceCountIs("AWS::Lambda::Function", 2);
  template.resourceCountIs("AWS::Lambda::Permission", 1);

  // ASSERT - SES Receipt Rule Set + Receipt Rule
  template.resourceCountIs("AWS::SES::ReceiptRuleSet", 1);
  template.resourceCountIs("AWS::SES::ReceiptRule", 1);

  // ASSERT - IAM Roles + Policy
  template.resourceCountIs("AWS::IAM::Role", 2);
  template.resourceCountIs("AWS::IAM::Policy", 1);
});
