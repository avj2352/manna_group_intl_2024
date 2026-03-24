import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import { AppDnsStack } from "../lib/dns/dns-stack";
import { AppSiteStack } from "../lib/site/site-stack";

describe("DNS and Subdomain Verification Tests", () => {
  let app: cdk.App;
  let dnsStack: AppDnsStack;
  let siteStack: AppSiteStack;
  const testDomain = "mannagroupintl.com";

  beforeEach(() => {
    app = new cdk.App();
    dnsStack = new AppDnsStack(app, "TestDnsStack", {
      env: { account: "533935803992", region: "us-east-1" },
      apexDomain: testDomain,
    });

    siteStack = new AppSiteStack(app, "TestSiteStack", {
      env: { account: "533935803992", region: "us-east-1" },
      dnsName: testDomain,
      hostedZone: dnsStack.hostedZone,
      certificate: dnsStack.certificate,
    });
  });

  describe("DNS Stack - Certificate Verification", () => {
    test("should create certificate with apex domain", () => {
      const template = Template.fromStack(dnsStack);

      template.hasResourceProperties("AWS::CertificateManager::Certificate", {
        DomainName: testDomain,
      });
    });

    test("should create certificate with www subdomain as subject alternative name", () => {
      const template = Template.fromStack(dnsStack);

      template.hasResourceProperties("AWS::CertificateManager::Certificate", {
        DomainName: testDomain,
        SubjectAlternativeNames: [`www.${testDomain}`],
      });
    });

    test("should use DNS validation for certificate", () => {
      const template = Template.fromStack(dnsStack);

      template.hasResourceProperties("AWS::CertificateManager::Certificate", {
        ValidationMethod: "DNS",
      });
    });

    test("should create exactly one certificate", () => {
      const template = Template.fromStack(dnsStack);

      template.resourceCountIs("AWS::CertificateManager::Certificate", 1);
    });
  });

  describe("DNS Stack - Hosted Zone Verification", () => {
    test("should create hosted zone with correct domain name", () => {
      const template = Template.fromStack(dnsStack);

      template.hasResourceProperties("AWS::Route53::HostedZone", {
        Name: `${testDomain}.`,
      });
    });

    test("should create exactly one hosted zone", () => {
      const template = Template.fromStack(dnsStack);

      template.resourceCountIs("AWS::Route53::HostedZone", 1);
    });
  });

  describe("Site Stack - CloudFront Distribution Subdomain Configuration", () => {
    test("should create CloudFront distribution with apex domain", () => {
      const template = Template.fromStack(siteStack);

      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          Aliases: Match.arrayWith([testDomain]),
        },
      });
    });

    test("should create CloudFront distribution with www subdomain", () => {
      const template = Template.fromStack(siteStack);

      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          Aliases: Match.arrayWith([`www.${testDomain}`]),
        },
      });
    });

    test("should create CloudFront distribution with both apex and www domains", () => {
      const template = Template.fromStack(siteStack);

      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          Aliases: [testDomain, `www.${testDomain}`],
        },
      });
    });

    test("should configure HTTPS redirect on CloudFront", () => {
      const template = Template.fromStack(siteStack);

      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          DefaultCacheBehavior: {
            ViewerProtocolPolicy: "redirect-to-https",
          },
        },
      });
    });

    test("should use HTTP2 protocol", () => {
      const template = Template.fromStack(siteStack);

      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          HttpVersion: "http2",
        },
      });
    });
  });

  describe("Site Stack - Route53 A Records for Subdomains", () => {
    test("should create A record for apex domain", () => {
      const template = Template.fromStack(siteStack);

      // Check that there's an A Record without a specific record name (apex domain)
      template.hasResourceProperties("AWS::Route53::RecordSet", {
        Type: "A",
        // RecordName is not set for apex domain
        AliasTarget: Match.objectLike({
          DNSName: Match.anyValue(),
        }),
      });
    });

    test("should create A record for www subdomain", () => {
      const template = Template.fromStack(siteStack);

      template.hasResourceProperties("AWS::Route53::RecordSet", {
        Type: "A",
        Name: `www.${testDomain}.`,
        AliasTarget: Match.objectLike({
          DNSName: Match.anyValue(),
        }),
      });
    });

    test("should create exactly 2 A records (apex and www)", () => {
      const template = Template.fromStack(siteStack);

      template.resourceCountIs("AWS::Route53::RecordSet", 2);
    });

    test("A records should point to CloudFront distribution", () => {
      const template = Template.fromStack(siteStack);

      // Both A records should have CloudFront distribution as alias target
      template.hasResourceProperties("AWS::Route53::RecordSet", {
        Type: "A",
        AliasTarget: {
          HostedZoneId: Match.anyValue(), // CloudFront's hosted zone ID (managed by CDK)
          DNSName: Match.anyValue(),
        },
      });
    });
  });

  describe("Integration Tests - DNS and Site Stack", () => {
    test("site stack should use certificate from DNS stack", () => {
      const siteTemplate = Template.fromStack(siteStack);

      // Verify that CloudFront distribution references a certificate
      siteTemplate.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          ViewerCertificate: {
            AcmCertificateArn: Match.anyValue(),
          },
        },
      });
    });

    test("A records should reference hosted zone from DNS stack", () => {
      const siteTemplate = Template.fromStack(siteStack);

      // Both A records should reference a hosted zone
      siteTemplate.hasResourceProperties("AWS::Route53::RecordSet", {
        HostedZoneId: Match.anyValue(),
      });
    });
  });

  describe("Subdomain Edge Cases", () => {
    test("should handle different apex domain correctly", () => {
      const customDomain = "example.org";
      const customApp = new cdk.App();

      const customDnsStack = new AppDnsStack(customApp, "CustomDnsStack", {
        env: { account: "533935803992", region: "us-east-1" },
        apexDomain: customDomain,
      });

      const customSiteStack = new AppSiteStack(customApp, "CustomSiteStack", {
        env: { account: "533935803992", region: "us-east-1" },
        dnsName: customDomain,
        hostedZone: customDnsStack.hostedZone,
        certificate: customDnsStack.certificate,
      });

      const template = Template.fromStack(customSiteStack);

      template.hasResourceProperties("AWS::CloudFront::Distribution", {
        DistributionConfig: {
          Aliases: [customDomain, `www.${customDomain}`],
        },
      });
    });

    test("certificate should cover both apex and www subdomain", () => {
      const template = Template.fromStack(dnsStack);

      // Verify the certificate configuration covers both domains
      template.hasResourceProperties("AWS::CertificateManager::Certificate", {
        DomainName: testDomain,
        SubjectAlternativeNames: [`www.${testDomain}`],
        DomainValidationOptions: Match.arrayWith([
          Match.objectLike({
            DomainName: testDomain,
          }),
        ]),
      });
    });
  });
});
