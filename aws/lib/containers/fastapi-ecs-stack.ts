import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
// ..custom


export class ApiEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC
    const vpc = new cdk.aws_ec2.Vpc(this, 'MannaGrpIntlApiVpc', {
      maxAzs: 2
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'MannaGrpIntlApiCluster', { vpc });

    // Build Docker image from local Dockerfile
    const image = new ecr_assets.DockerImageAsset(this, 'MannaGrpIntlApiImage', {
      directory: '../api',
    });

    // Create a secret in Secrets Manager
    // FIXME: Create a separate stack for this
    const secret = new secretsmanager.Secret(this, 'MannaGrpIntlApiSecret', {
      secretName: 'manna-grp-intl-api-secret',
      generateSecretString: {
        secretStringTemplate: JSON.stringify(
            {
                AUTH0_DOMAIN: 'auth0_domain',
                AUTH0_AUDIENCE: 'auth0_audience',                
                SQL_CONN: "sql_connection",
                DB_NAME: "db_name",
                DB_USERNAME: "db_username",
                DB_PASSWORD: "db_password",
                MAX_DB_CONN: 1,
                SERVICE_NAME: "service_name",
                REGION_NAME: "us-east-1",
                S3_ACCESS_KEY: "s3_access_key",
                S3_SECRET_KEY: "s3_secret_key",
                S3_ASSETS_BUCKET: "s3_asset_bucket",                
            }
        ),
        generateStringKey: 'PASSWORD'
      }
    });

    // Create a Fargate service
    // FIXME: This should import from the secrets stack
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MannaGrpIntlApiService', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(image),
        containerPort: 80,
        secrets: {
            AUTH0_DOMAIN: ecs.Secret.fromSecretsManager(secret, 'AUTH0_DOMAIN'),
            AUTH0_AUDIENCE: ecs.Secret.fromSecretsManager(secret, 'AUTH0_AUDIENCE'),
            SQL_CONN: ecs.Secret.fromSecretsManager(secret, 'SQL_CONN'),
            DB_NAME: ecs.Secret.fromSecretsManager(secret, 'DB_NAME'),
            DB_USERNAME: ecs.Secret.fromSecretsManager(secret, 'DB_USERNAME'),
            DB_PASSWORD: ecs.Secret.fromSecretsManager(secret, 'DB_PASSWORD'),
            MAX_DB_CONN: ecs.Secret.fromSecretsManager(secret, 'MAX_DB_CONN'),
            SERVICE_NAME: ecs.Secret.fromSecretsManager(secret, 'SERVICE_NAME'),
            REGION_NAME: ecs.Secret.fromSecretsManager(secret, 'REGION_NAME'),
            S3_ACCESS_KEY: ecs.Secret.fromSecretsManager(secret, 'S3_ACCESS_KEY'),
            S3_SECRET_KEY: ecs.Secret.fromSecretsManager(secret, 'S3_SECRET_KEY'),
            S3_ASSETS_BUCKET: ecs.Secret.fromSecretsManager(secret, 'S3_ASSETS_BUCKET'),
        },
      },
      publicLoadBalancer: true,
    });

    // Output the load balancer URL
    new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: fargateService.loadBalancer.loadBalancerDnsName });
  }
}