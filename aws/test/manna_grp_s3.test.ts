import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AssetsStack } from "../lib/storage/s3-stack";

test(`Expect Stack to contain -
    2 S3 buckets
    `, () => {
  // ARRANGE
  const app = new cdk.App();
  // ACT
  const s3Stack = new AssetsStack(app, "MyTestAssetStack", {
    env: { account: "533935803992", region: "us-east-1" },    
  });  

  const s3AssetStack = Template.fromStack(s3Stack);  

  // ASSERT - Bucket Stack
  s3AssetStack.resourceCountIs("AWS::S3::Bucket", 2);
  
});
