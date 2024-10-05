#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppSiteStack } from "../lib/site/site-stack";
import { AppDnsStack } from "../lib/dns/dns-stack";
import { DBStack } from "../lib/db/pg-stack";
import { AssetsStack } from "../lib/storage/s3-stack";
import { ApiEcsStack } from "../lib/containers/fastapi-ecs-stack";

const app = new cdk.App();

const apexDomain = "mannagroupintl.com";

// ..domain & sub-domain configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const PRODUCT_NAME = "MannaGroupIntl";

//..stack to map to dns and create hostedzones
const { hostedZone, certificate } = new AppDnsStack(
  app,
  `${PRODUCT_NAME}AppDnsStack`,
  {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
    apexDomain,
  },
);

//..stack to deploy react ui, create cloudfront instance
new AppSiteStack(app, `${PRODUCT_NAME}AppSiteStack`, {
  env: { ...env },
  hostedZone,
  certificate,
  dnsName: apexDomain,
});

//..stack to create postgresql rds instance
new DBStack(app, `${PRODUCT_NAME}DBStack`, {
  env: { ...env },
});

//..stack to create 2 s3 buckets
new AssetsStack(app, `${PRODUCT_NAME}AssetStack`, {
  env: { ...env},
});

//..create ecs deployment
new ApiEcsStack(app, `${PRODUCT_NAME}ApiEcsStack`, {
  env: { ...env },
});
