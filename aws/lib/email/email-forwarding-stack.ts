import { Stack, StackProps, Duration, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IPublicHostedZone, MxRecord } from "aws-cdk-lib/aws-route53";
import {
  EmailIdentity,
  Identity,
  ReceiptRuleSet,
  ReceiptRule,
  TlsPolicy,
} from "aws-cdk-lib/aws-ses";
import * as sesActions from "aws-cdk-lib/aws-ses-actions";
import { Bucket, BlockPublicAccess } from "aws-cdk-lib/aws-s3";
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { IEmailAlias } from "./email-aliases";
import * as path from "path";

interface IEmailForwardingStackProps extends StackProps {
  hostedZone: IPublicHostedZone;
  apexDomain: string;
  emailAliases: IEmailAlias[];
}

export class EmailForwardingStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: IEmailForwardingStackProps
  ) {
    super(scope, id, props);

    const { hostedZone, apexDomain, emailAliases } = props;

    // Build alias→recipient mapping for Lambda env var
    const emailMapping: Record<string, string> = {};
    const aliasAddresses: string[] = [];
    for (const { alias, recipient } of emailAliases) {
      const fullAlias = `${alias}@${apexDomain}`;
      emailMapping[fullAlias] = recipient;
      aliasAddresses.push(fullAlias);
    }

    // SES domain identity — auto-creates DKIM CNAME records in Route53
    new EmailIdentity(this, "MannaGroupEmailIdentity", {
      identity: Identity.publicHostedZone(hostedZone),
    });

    // MX record so SES receives inbound email for this domain
    new MxRecord(this, "MannaGroupEmailMxRecord", {
      zone: hostedZone,
      values: [{ priority: 10, hostName: "inbound-smtp.us-east-1.amazonaws.com" }],
    });

    // S3 bucket for temporary email storage
    const emailBucket = new Bucket(this, "MannaGroupEmailBucket", {
      bucketName: `manna-group-email-${this.account}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      lifecycleRules: [{ expiration: Duration.days(7) }],
    });

    // Lambda function that forwards emails
    const forwarderFn = new Function(this, "MannaGroupEmailForwarder", {
      runtime: Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: Code.fromAsset(path.join(__dirname, "lambda")),
      timeout: Duration.seconds(30),
      memorySize: 256,
      environment: {
        S3_BUCKET: emailBucket.bucketName,
        EMAIL_MAPPING: JSON.stringify(emailMapping),
        DOMAIN: apexDomain,
      },
    });

    emailBucket.grantRead(forwarderFn);

    forwarderFn.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["ses:SendRawEmail"],
        resources: ["*"],
      })
    );

    // SES receipt rule set + rule
    const ruleSet = new ReceiptRuleSet(this, "MannaGroupEmailRuleSet", {
      receiptRuleSetName: "manna-group-email-forwarding",
    });

    new ReceiptRule(this, "MannaGroupEmailForwardRule", {
      ruleSet,
      receiptRuleName: "forward-to-gmail",
      recipients: aliasAddresses,
      tlsPolicy: TlsPolicy.REQUIRE,
      actions: [
        new sesActions.S3({
          bucket: emailBucket,
        }),
        new sesActions.Lambda({
          function: forwarderFn,
        }),
      ],
    });
  }
}
