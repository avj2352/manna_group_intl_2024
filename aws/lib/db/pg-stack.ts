import {
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
  CfnOutput,
} from "aws-cdk-lib";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from "aws-cdk-lib/aws-rds";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class DBStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // postgresql configuration
    const engine = DatabaseInstanceEngine.postgres({
      version: PostgresEngineVersion.VER_15,
    });
    const instanceType = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
    const port = 5432;
    const dbName = "manna_grp_rds_db";
    const username = "postgres";

    // Create a VPC and subnet for the DB instance
    const vpc = new Vpc(this, "MannaGrpDBVpc", {
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });

    // Create a Secrets Manager secret to store the database credentials
    // MannaGrpDatabaseSecret
    const databaseSecret = new Secret(this, "MannaGrpDatabaseSecret", {
      secretName: "manna-grp-app-database-secret",
      description: "Manna group DB master user credentials",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username }),
        generateStringKey: "password",
        passwordLength: 16,
        excludePunctuation: true,
      },
    });

    // Create a Security Group that allows inbond traffic on the database port
    const dbSg = new SecurityGroup(this, "MannaGrpDBSecurityGroup", {
      securityGroupName: "MannaGrpDBSecurityGroup",
      vpc,
      allowAllOutbound: true,
      description: "Security Group for RDS instance",
    });

    // Add Inbound rule - for dev, allo inbound traffic on the database port
    dbSg.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(port),
      "Local Development - connect frm anywhere"
    );

    // Add Inbound rule - allow port connection only within VPC
    // Setup while going to production
    // dbSg.addIngressRule(
    //   Peer.ipv4(vpc.vpcCidrBlock),
    //   Port.tcp(port),
    //   `Allow port ${port} for database connection from only within the VPC (${vpc.vpcId})`
    // );

    // create RDS instance (PostgreSQL)
    const dbInstance = new DatabaseInstance(this, "MannaGrpDBRDSInstance", {
      vpc,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      instanceType,
      engine,
      port,
      securityGroups: [dbSg],
      databaseName: dbName,
      credentials: Credentials.fromSecret(databaseSecret),
      backupRetention: Duration.days(0), // disable automatic DB snapshot retention
      deleteAutomatedBackups: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Output the connection string and credentials
    new CfnOutput(this, "MannaGrpDBDatabaseEndpoint", {
      value: dbInstance.dbInstanceEndpointAddress,
    });

    new CfnOutput(this, "MannaGrpDBDatabaseUsername", {
      value: username,
    });
  }
}
