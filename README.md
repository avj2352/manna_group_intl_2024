# Manna Group International

MANNA International Corp. is introducing products in healthcare areas like Nutraceutical Supplements, OTC pharmaceuticals & Essential Oils.
This is the new version of the website

[Current Website](https://mannagroupintl.com/)

## Important Links

- [AWS RDS JDBC Drivers](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html#java-rds-drivers)
- [Rust workbook](https://francescociulla.gumroad.com/l/rustworkbook?_gl=1*en7586*_ga*MTgyMjgzNzI4LjE3MjU1NDU3ODc.*_ga_6LJN6D94N6*MTcyNTU0NTc4Ny4xLjEuMTcyNTU0NTgzMC4wLjAuMA..)
- [Javascript - Console Log alternatives](https://dev.to/alishgiri/say-no-to-consolelog-556n?ref=dailydev)
- [Cloudfront URL](https://d2sjpgezzxd3c7.cloudfront.net)
- [Miro planning board](https://miro.com/app/board/uXjVKM2zjnA=/)
- [DaisyUI - Template for React Manna Website](https://daisyui.com)
- [React Carousel - Embla](https://www.embla-carousel.com)
- [React Worldmap - Library](https://www.react-simple-maps.io)
- [React Grommet - Worldmap](https://v2.grommet.io)
- [React Tailwind Layout](https://www.radix-ui.com)
- [Open source - free image generator AI](http://flowgpt.com/)
- [Limited image gen AI](https://openart.ai)
- [Animated guide around the website / web-app](https://driverjs.com)

# Data Model

Data Model for an E-commerce Application

```bash
# Exported from QuickDBD: https://www.quickdatabasediagrams.com/
# Link to schema: https://app.quickdatabasediagrams.com/#/d/cXB9O4

# User table is managed by Auth0
User
-----
_id PK int
name string
email string
vendor string
photo_url string NULL


Product
-----
_id PK int
name string
description string NULL
content string
created_by int FK >- User._id
created_date string
price string
quantity int
# USD / EUR / INR
currency string

Asset
---
_id PK int
position int
# product / gallery / thumbnail / other
type string
link string


AssetProduct
---
_id PK int
asset_id int FK >- Asset._id
product_id int FK >- Product._id

Order
---
_id PK int
order_by int FK >- User._id
content string
order_date string
# on-delivery / online
order_type string
# pending / shipped / delivered
order_status string
shipping_address string
billing_address string

```

## Core Entities

### 1. Customer:

- CustomerID (PK)
- FirstName
- LastName
- Email
- Password
- Address
- PhoneNumber
- OrderHistory (FK to Order)

### 2. Product:

- ProductID (PK)
- Name
- Description
- Price
- QuantityInStock
- CategoryID (FK to Category)
- ImageURL

### 3. Category:

- CategoryID (PK)
- Name
- Description

### 4. Order:

- OrderID (PK)
- OrderDate
- ShippingAddress
- CustomerID (FK to Customer)
- OrderStatus (e.g., Pending, Shipped, Delivered)

### 5. OrderItem:

- OrderItemID (PK)
- OrderID (FK to Order)
- ProductID (FK to Product)
- Quantity
- Price

## Additional Entities (Optional)

### Review:

- ReviewID (PK)
- ProductID (FK to Product)
- CustomerID (FK to Customer)
- Rating
- Comment

### Cart:

- CartID (PK)
- CustomerID (FK to Customer)
- Items (List of ProductIDs)

### Shipping:

- ShippingID (PK)
- ShippingMethod
- ShippingCost
- ShippingProvider

---

## Relationships

- Customer has many Orders.
- Order has many OrderItems.
- OrderItem belongs to Product and Order.
- Product belongs to Category.
- Product can have many Reviews.
- Customer can have one Cart.
- Order can have one Shipping.

## Considerations

- Normalization: Ensure that the data model is normalized to avoid redundancy and inconsistencies.
- Scalability: Design the model to accommodate large datasets and high traffic.
- Performance: Consider indexing frequently queried fields to improve performance.
- Security: Implement appropriate security measures to protect sensitive customer data.
- Flexibility: Allow for future extensions and changes to the application.

## Example Database Schema (SQL)

```sql
-- User table is managed by Auth0
CREATE TABLE "User" (
    "_id" int   NOT NULL,
    "name" string   NOT NULL,
    "email" string   NOT NULL,
    "vendor" string   NOT NULL,
    "photo_url" string   NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Product" (
    "_id" int   NOT NULL,
    "name" string   NOT NULL,
    "description" string   NULL,
    "content" string   NOT NULL,
    "created_by" int   NOT NULL,
    "created_date" string   NOT NULL,
    "price" string   NOT NULL,
    "quantity" int   NOT NULL,
    -- USD / EUR / INR
    "currency" string   NOT NULL,
    CONSTRAINT "pk_Product" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Asset" (
    "_id" int   NOT NULL,
    "position" int   NOT NULL,
    -- product / gallery / thumbnail / other
    "type" string   NOT NULL,
    "link" string   NOT NULL,
    CONSTRAINT "pk_Asset" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "AssetProduct" (
    "_id" int   NOT NULL,
    "asset_id" int   NOT NULL,
    "product_id" int   NOT NULL,
    CONSTRAINT "pk_AssetProduct" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Order" (
    "_id" int   NOT NULL,
    "order_by" int   NOT NULL,
    "content" string   NOT NULL,
    "order_date" string   NOT NULL,
    -- on-delivery / online
    "order_type" string   NOT NULL,
    -- pending / shipped / delivered
    "order_status" string   NOT NULL,
    "shipping_address" string   NOT NULL,
    "billing_address" string   NOT NULL,
    CONSTRAINT "pk_Order" PRIMARY KEY (
        "_id"
     )
);

ALTER TABLE "Product" ADD CONSTRAINT "fk_Product_created_by" FOREIGN KEY("created_by")
REFERENCES "User" ("_id");

ALTER TABLE "AssetProduct" ADD CONSTRAINT "fk_AssetProduct_asset_id" FOREIGN KEY("asset_id")
REFERENCES "Asset" ("_id");

ALTER TABLE "AssetProduct" ADD CONSTRAINT "fk_AssetProduct_product_id" FOREIGN KEY("product_id")
REFERENCES "Product" ("_id");

ALTER TABLE "Order" ADD CONSTRAINT "fk_Order_order_by" FOREIGN KEY("order_by")
REFERENCES "User" ("_id");
```

# AWS Cloudformation template to connect to RDS Instance

The following Cloudformation template creates RDS Instance which is publicly accessible on port 5432. It also creates username and password
as AWS Secrets

To connect using **DBeaver** client, sometimes you might need the JDBC driver for PostgreSQL. They are found in the link - [Download RDS JDBC Drivers](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html#java-rds-drivers)

```typescript
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

export class MannaGrpDBStack extends Stack {
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

```

# Website Statistics

The following provides a summary of website performance improvements and statistics

### Current Website Statistics

- Techstack: Php + Wordpress + Javascript libraries
- Link: https://mannagroupintl.com
- Avg Time taken to load (with cache disabled): 1.49 seconds
- Resources loaded: 108
- Size of loaded assets: 8.01 mb
- Size of transferred assets: 5.55 mb
- Avg time taken to load website: under 1 minute
- Lighthouse (Google) score: 59

### New Website Statistics

- Techstack: React + AWS
- Link: https://d2sjpgezzxd3c7.cloudfront.net (to be hosted)
- Avg Time taken to load (with cache disabled): 277 milliseconds
- Resources loaded: 18
- Size of loaded assets: 1.5 mb
- Size of transferred assets: 1.13 mb
- Avg time taken to load website: under 33 milliseconds
- Lighthouse (Google) score: 77

# Mannagroup international transfer from GoDaddy to AWS

The following are the Nameservers to Wordpress Site:

```bash
# domain name servers
ns8267.hostgator.com
ns8268.hostgator.com
```
