import { App, Stack } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { DBStack } from "../lib/db/pg-stack";

describe("MannaGrpDBStack", () => {
  let app: App;
  let stack: Stack;

  beforeAll(() => {
    app = new App();
    stack = new DBStack(app, "TestStack");
  });

  test("Stack should be created", () => {
    expect(stack).toBeDefined();
  });

  test("Should have a VPC", () => {
    const vpc = stack.node.findChild("MannaGrpDBVpc");
    expect(vpc).toBeInstanceOf(ec2.Vpc);
  });

  test("Should have an RDS instance", () => {
    const rdsInstance = stack.node.findChild("MannaGrpDBRDSInstance");
    expect(rdsInstance).toBeInstanceOf(rds.DatabaseInstance);
  });

  test("Should have a Secrets Manager secret", () => {
    const secret = stack.node.findChild("MannaGrpDatabaseSecret");
    expect(secret).toBeInstanceOf(secretsmanager.Secret);
  });

  // Add more tests for other components and configurations as needed

  afterAll(() => {
    app.synth(); // Synthesize the stack
  });
});
