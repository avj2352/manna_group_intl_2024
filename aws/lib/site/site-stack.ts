import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from "aws-cdk-lib/aws-s3";
import {
  Distribution,
  HttpVersion,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import * as path from "path";

/**
 * PAJ - Stack to create
 * S3 bucket
 * S3 bucket deployment
 * Cloudfront
 */

interface IAppSiteStackProps extends StackProps {}

export class AppSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: IAppSiteStackProps) {
    super(scope, id, props);

    // ..create S3 bucket
    const websiteBucket = new Bucket(this, "MannaAppSiteBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    // ..create cloudfront
    const cloudFront = new Distribution(this, "MannaAppSiteDistribution", {
      defaultBehavior: {
        origin: new S3Origin(websiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      httpVersion: HttpVersion.HTTP2,
    });

    // ..create bucket deployment
    new BucketDeployment(this, "MannaAppSiteDeploy", {
      sources: [Source.asset(path.join(__dirname, "..", "..", "build"))],
      destinationBucket: websiteBucket,
      distribution: cloudFront,
      distributionPaths: ["/*"],
    });

    // ..create output for S3 deployment process
    new CfnOutput(this, "MannaAppSiteBucketNameExport", {
      value: websiteBucket.bucketName,
      exportName: "MannaAppSiteBucketName",
    });

    // ..create output for cloudfront deployment process
    new CfnOutput(this, "MannaAppSiteURL", {
      value: cloudFront.distributionDomainName,
      exportName: "MannaAppSiteURL",
    });
  }
}
