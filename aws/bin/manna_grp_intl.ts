#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppSiteStack } from "../lib/site/site-stack";

const app = new cdk.App();

// ..domain & sub-domain configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const PRODUCT_NAME = "MannaGroupIntl";

new AppSiteStack(app, `${PRODUCT_NAME}AppSiteStack`, {
  env: { ...env },
});
