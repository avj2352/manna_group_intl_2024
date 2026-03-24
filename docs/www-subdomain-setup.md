# WWW Subdomain Setup for mannagroupintl.com

## Overview
This document describes the configuration of the `www` subdomain for `mannagroupintl.com` that redirects users to the React CloudFront application.

## Architecture

The www subdomain setup consists of three main components:

1. **SSL/TLS Certificate** - ACM certificate covering both apex and www subdomain
2. **CloudFront Distribution** - Serves content for both domains
3. **Route53 DNS Records** - A records pointing both domains to CloudFront

```
User Request (www.mannagroupintl.com)
           ↓
    Route53 DNS (A Record)
           ↓
   CloudFront Distribution
           ↓
      S3 Bucket (React App)
```

## Implementation Details

### 1. DNS Stack (`aws/lib/dns/dns-stack.ts`)

The DNS stack creates:
- **Hosted Zone**: `mannagroupintl.com`
- **ACM Certificate**: Covers both `mannagroupintl.com` and `www.mannagroupintl.com`

#### Certificate Configuration
```typescript
this._certificate = new Certificate(this, "MannaGroupCertificate", {
  domainName: apexDomain,
  subjectAlternativeNames: [`www.${apexDomain}`],
  validation: CertificateValidation.fromDns(this._hostedZone),
});
```

**Key Points:**
- The certificate uses DNS validation through Route53
- Subject Alternative Names (SANs) include the www subdomain
- Certificate is created in `us-east-1` (required for CloudFront)

### 2. Site Stack (`aws/lib/site/site-stack.ts`)

The site stack creates:
- **S3 Bucket**: Hosts the React application static files
- **CloudFront Distribution**: CDN for global content delivery
- **Route53 A Records**: DNS routing for both apex and www subdomain

#### CloudFront Configuration
```typescript
const cloudFront = new Distribution(this, "MannaAppSiteDistribution", {
  defaultBehavior: {
    origin: new S3Origin(websiteBucket),
    viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
  },
  httpVersion: HttpVersion.HTTP2,
  domainNames: [dnsName, `www.${dnsName}`],
  certificate: certificate,
});
```

**Key Points:**
- CloudFront is configured with both domain names
- HTTPS is enforced via `REDIRECT_TO_HTTPS` policy
- Uses HTTP/2 for improved performance

#### DNS Records
```typescript
// Apex domain A record
new ARecord(this, "MannaGroupIntlSiteARecordApex", {
  zone: hostedZone,
  target: RecordTarget.fromAlias(new CloudFrontTarget(cloudFront)),
});

// WWW subdomain A record
new ARecord(this, "MannaGroupIntlSiteARecordWWW", {
  zone: hostedZone,
  recordName: "www",
  target: RecordTarget.fromAlias(new CloudFrontTarget(cloudFront)),
});
```

**Key Points:**
- Both records use CloudFront alias targets
- No additional IP addresses or CNAMEs required
- Alias records are free and support automatic failover

## Deployment

### Prerequisites
- AWS CDK v2 installed
- AWS credentials configured
- Domain `mannagroupintl.com` registered and name servers configured

### Deployment Steps

1. **Synthesize the CloudFormation templates:**
   ```bash
   cd aws
   cdk synth
   ```

2. **Deploy the DNS stack first:**
   ```bash
   cdk deploy MannaGroupIntlAppDnsStack
   ```

   This creates:
   - Hosted Zone
   - ACM Certificate
   - DNS validation records

3. **Wait for certificate validation:**
   - Typically takes 5-30 minutes
   - Check status in AWS Certificate Manager console

4. **Deploy the site stack:**
   ```bash
   cdk deploy MannaGroupIntlAppSiteStack
   ```

   This creates:
   - S3 bucket
   - CloudFront distribution
   - Route53 A records
   - Deploys React app

5. **Verify deployment:**
   ```bash
   # Check CloudFront status
   aws cloudfront list-distributions

   # Test DNS resolution
   dig mannagroupintl.com
   dig www.mannagroupintl.com
   ```

### DNS Propagation
- DNS changes typically propagate within 5-60 minutes
- CloudFront distribution deployment takes 15-45 minutes
- Full propagation globally may take up to 48 hours

## Testing

### Test Both Domains
```bash
# Test apex domain
curl -I https://mannagroupintl.com

# Test www subdomain
curl -I https://www.mannagroupintl.com

# Verify HTTPS redirect
curl -I http://www.mannagroupintl.com
```

### Expected Results
- Both domains should return 200 OK
- HTTP requests should redirect to HTTPS (301 or 302)
- Both should serve the same React application
- Certificate should be valid for both domains

### Browser Testing
1. Navigate to `https://www.mannagroupintl.com`
2. Verify SSL certificate is valid
3. Check that the React app loads correctly
4. Verify all assets load without errors

## Monitoring & Troubleshooting

### CloudWatch Logs
Monitor CloudFront metrics:
- Requests
- Error rates (4xx, 5xx)
- Bytes transferred
- Cache hit ratio

### Common Issues

#### Certificate Validation Pending
**Symptom:** Certificate stuck in "Pending validation"
**Solution:**
- Verify DNS records in Route53
- Check that hosted zone name servers match domain registrar
- Wait up to 30 minutes for propagation

#### 403 Forbidden Error
**Symptom:** CloudFront returns 403
**Solution:**
- Check S3 bucket policy
- Verify S3 bucket has public read access
- Ensure `index.html` exists in bucket

#### SSL Certificate Error
**Symptom:** Browser shows certificate warning
**Solution:**
- Verify certificate includes both domains
- Check certificate is associated with CloudFront distribution
- Ensure CloudFront is using the correct certificate

#### DNS Not Resolving
**Symptom:** Domain doesn't resolve
**Solution:**
- Check A records exist in Route53
- Verify hosted zone name servers
- Wait for DNS propagation (up to 48 hours)

## Cost Considerations

### Monthly Costs (Estimated)
- **Route53 Hosted Zone:** $0.50/month
- **Route53 Queries:** $0.40 per million queries
- **ACM Certificate:** Free
- **CloudFront:**
  - First 10TB data transfer: $0.085/GB
  - First 10M requests: $0.0075 per 10,000 requests
- **S3 Storage:** ~$0.023/GB/month

### Cost Optimization Tips
- Enable CloudFront compression
- Set appropriate cache TTLs
- Use S3 Intelligent-Tiering
- Monitor and set billing alerts

## Security Considerations

### Current Security Measures
1. **HTTPS Enforced**: All HTTP traffic redirected to HTTPS
2. **ACM Certificate**: Automatically renewed by AWS
3. **S3 Bucket Security**: Public read access with ACLs blocked
4. **CloudFront**: Acts as security barrier in front of S3

### Recommended Enhancements
1. **WAF (Web Application Firewall):**
   - Add AWS WAF to CloudFront
   - Protect against common web exploits

2. **CloudFront Security Headers:**
   - Add response headers function
   - Implement CSP, HSTS, X-Frame-Options

3. **Access Logging:**
   - Enable CloudFront access logs
   - Log to dedicated S3 bucket

4. **DDoS Protection:**
   - CloudFront includes basic protection
   - Consider AWS Shield Standard (included) or Advanced

## Maintenance

### Certificate Renewal
- ACM automatically renews certificates
- No manual intervention required
- Verify renewal 30 days before expiration

### Stack Updates
To update the infrastructure:
```bash
cd aws
cdk diff  # Preview changes
cdk deploy MannaGroupIntlAppSiteStack
```

### React App Updates
The app is automatically deployed when running:
```bash
cdk deploy MannaGroupIntlAppSiteStack
```

Build artifacts from `aws/build/` are deployed to S3 and CloudFront cache is invalidated.

## Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)
- [Route53 Documentation](https://docs.aws.amazon.com/route53/)
- [ACM Best Practices](https://docs.aws.amazon.com/acm/latest/userguide/acm-bestpractices.html)

## Rollback Plan

If issues occur after deployment:

1. **Immediate DNS Change:**
   ```bash
   # Point to previous distribution or origin
   aws route53 change-resource-record-sets ...
   ```

2. **CloudFormation Stack Rollback:**
   ```bash
   # Rollback to previous version
   cdk deploy --rollback
   ```

3. **Manual Rollback:**
   - Disable CloudFront distribution
   - Update DNS records to previous values
   - Wait for DNS propagation

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-03-23 | 1.0 | Initial www subdomain setup | System |

---

**Last Updated:** 2026-03-23
**Maintained By:** DevOps Team
**Contact:** For issues or questions, refer to the project repository
