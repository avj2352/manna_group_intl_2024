#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppSiteStack } from "../lib/site/site-stack";
import { AppDnsStack } from "../lib/dns/dns-stack";
import { MannaGrpDBStack } from "../lib/db/pg-stack";

const app = new cdk.App();

const apexDomain = "mannagroupintl.com";

// ..domain & sub-domain configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const PRODUCT_NAME = "MannaGroupIntl";

const { hostedZone, certificate } = new AppDnsStack(
  app,
  `${PRODUCT_NAME}AppDnsStack`,
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
    apexDomain,
  },
);

new AppSiteStack(app, `${PRODUCT_NAME}AppSiteStack`, {
  env: { ...env },
  hostedZone,
  certificate,
  dnsName: apexDomain,
});

new MannaGrpDBStack(app, `${PRODUCT_NAME}DBStack`, {
  env: { ...env },
});
