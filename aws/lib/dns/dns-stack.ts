/**
 * Code for managing DNS, HostedZone & Certificates
 **/
import {
    IPublicHostedZone,    
    PublicHostedZone,    
  } from "aws-cdk-lib/aws-route53";
  import {
    Certificate,
    CertificateValidation,
    ICertificate,
  } from "aws-cdk-lib/aws-certificatemanager";
  import { Construct } from "constructs";
  import { Stack, StackProps } from "aws-cdk-lib";
  
  interface IAppDnsStackProps extends StackProps {
    apexDomain: string;    
  }
  
  export class AppDnsStack extends Stack {
    private readonly _hostedZone: IPublicHostedZone;
    private readonly _certificate: ICertificate;
  
    constructor(scope: Construct, id: string, props: IAppDnsStackProps) {
      super(scope, id, props);
  
      const { apexDomain } = props;
  
      // Create Primary domain - pramod-profile.net
      this._hostedZone = new PublicHostedZone(this, "MannaGroupHostedZone", {
        zoneName: apexDomain,
      });
  
      // Request the wildcard TLS certificate, CDK will take care of domain ownership validation via
      // CNAME DNS entries in Route53, a custom resource will be used on our behalf
      this._certificate = new Certificate(this, "MannaGroupCertificate", {
        domainName: apexDomain,        
        validation: CertificateValidation.fromDns(this._hostedZone),
      });
    }
  
    // getters
    public get hostedZone() {
      return this._hostedZone;
    }
  
    public get certificate() {
      return this._certificate;
    }
  }
  