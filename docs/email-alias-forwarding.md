# Email Alias Forwarding for mannagroupintl.com

## Overview

This document describes the email forwarding infrastructure for `mannagroupintl.com`. Five email aliases are configured to forward incoming mail to their corresponding Gmail addresses using AWS SES, S3, and Lambda.

## Email Alias Mapping

| Alias | Assignee | Forwards To |
|-------|----------|-------------|
| admin@mannagroupintl.com | Pramod Jingade | pramod.jingade@gmail.com |
| sales@mannagroupintl.com | George Varges | vargesg@gmail.com |
| hr@mannagroupintl.com | George Varges | vargesg@gmail.com |
| george@mannagroupintl.com | George Varges | vargess@gmail.com |
| femiaade@mannagroupintl.com | Dr Femi Aade | femiaade2@gmail.com |

## Architecture

```
Incoming email (e.g., admin@mannagroupintl.com)
           ↓
   Route53 MX Record → inbound-smtp.us-east-1.amazonaws.com
           ↓
   AWS SES Receipt Rule
      ├── 1. Save raw email to S3 bucket
      └── 2. Invoke Lambda function
                  ↓
           Lambda reads email from S3
           Rewrites headers (From, Reply-To, To)
           Sends via SES → Gmail inbox
```

## Implementation Details

### 1. CDK Stack (`aws/lib/email/email-forwarding-stack.ts`)

The `EmailForwardingStack` creates all infrastructure needed for email forwarding:

#### Resources Created

| Resource | Purpose |
|----------|---------|
| **MX Record** | Routes incoming email to SES (`inbound-smtp.us-east-1.amazonaws.com`, priority 10) |
| **S3 Bucket** | Temporary email storage with 7-day lifecycle policy |
| **Lambda Function** | Reads email from S3, rewrites headers, forwards via SES |
| **SES Receipt Rule Set** | Rule set named `manna-group-email-forwarding` |
| **SES Receipt Rule** | Matches all alias addresses, triggers S3 save + Lambda |

#### Stack Props

```typescript
interface IEmailForwardingStackProps extends StackProps {
  hostedZone: IPublicHostedZone;  // from AppDnsStack
  apexDomain: string;              // "mannagroupintl.com"
  emailAliases: IEmailAlias[];     // alias-to-recipient mappings
}
```

### 2. Alias Configuration (`aws/lib/email/email-aliases.ts`)

Email aliases are configured in a separate file for reusability:

```typescript
export const EMAIL_ALIASES: IEmailAlias[] = [
  { alias: "admin", recipient: "pramod.jingade@gmail.com" },
  { alias: "sales", recipient: "vargesg@gmail.com" },
  // ...
];
```

To add or remove aliases, edit this file and redeploy the stack.

### 3. Lambda Forwarder (`aws/lib/email/lambda/index.mjs`)

The Lambda function:
1. Receives the SES event containing the message ID and recipients
2. Fetches the raw email from S3
3. Looks up the forwarding address from the `EMAIL_MAPPING` environment variable
4. Rewrites email headers:
   - `From:` → `"Original Sender Name" <alias@mannagroupintl.com>`
   - `Reply-To:` → original sender's email address
   - `To:` → target Gmail address
   - `Subject:` → prefixed with `[Fwd]`
5. Removes DKIM-Signature headers to avoid validation failures
6. Sends the modified email via SES `SendRawEmailCommand`

### 4. CDK App Entry Point (`aws/bin/manna_grp_intl.ts`)

The stack is instantiated after the DNS stack:

```typescript
new EmailForwardingStack(app, `${PRODUCT_NAME}EmailForwardingStack`, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  hostedZone,
  apexDomain,
  emailAliases: EMAIL_ALIASES,
});
```

## Deployment

### Prerequisites
- AWS CDK v2 installed
- AWS credentials configured with access to SES, S3, Lambda, Route53
- SES in production mode (not sandbox) for `mannagroupintl.com`
- Domain `mannagroupintl.com` registered and name servers configured

### Deployment Steps

1. **Synthesize the CloudFormation template:**
   ```bash
   cd aws
   cdk synth MannaGroupIntlEmailForwardingStack
   ```

2. **Deploy the stack:**
   ```bash
   cdk deploy MannaGroupIntlEmailForwardingStack
   ```

   This creates:
   - MX record in Route53
   - S3 bucket for email storage
   - Lambda function
   - SES receipt rule set and rule

3. **Activate the SES receipt rule set:**
   Only one receipt rule set can be active per AWS account per region. Activate it via the AWS Console or CLI:
   ```bash
   aws ses set-active-receipt-rule-set \
     --rule-set-name manna-group-email-forwarding \
     --region us-east-1
   ```

4. **Verify MX record propagation:**
   ```bash
   dig MX mannagroupintl.com
   ```
   Expected output: `10 inbound-smtp.us-east-1.amazonaws.com.`

5. **Send a test email:**
   Send an email to `admin@mannagroupintl.com` and verify it arrives in the corresponding Gmail inbox.

## Testing

### Verify DNS
```bash
# Check MX record
dig MX mannagroupintl.com

# Expected:
# mannagroupintl.com. 300 IN MX 10 inbound-smtp.us-east-1.amazonaws.com.
```

### Test Email Forwarding
Send a test email to each alias:
```bash
# From any external email, send to:
# - admin@mannagroupintl.com → should arrive at pramod.jingade@gmail.com
# - sales@mannagroupintl.com → should arrive at vargesg@gmail.com
# - hr@mannagroupintl.com → should arrive at vargesg@gmail.com
# - george@mannagroupintl.com → should arrive at vargess@gmail.com
# - femiaade@mannagroupintl.com → should arrive at femiaade2@gmail.com
```

### Check Lambda Logs
```bash
aws logs tail /aws/lambda/MannaGroupIntlEmailForwardingStack-MannaGroupEmailForwarder \
  --region us-east-1 --follow
```

### Check S3 Bucket
```bash
aws s3 ls s3://manna-group-email-$(aws sts get-caller-identity --query Account --output text)/ \
  --region us-east-1
```

## Troubleshooting

### Email Not Arriving

**Symptom:** Email sent to alias but nothing arrives in Gmail.

**Check:**
1. MX record exists: `dig MX mannagroupintl.com`
2. SES receipt rule set is active:
   ```bash
   aws ses describe-active-receipt-rule-set --region us-east-1
   ```
3. Lambda function executed — check CloudWatch Logs
4. S3 bucket has the email stored

### Lambda Errors

**Symptom:** Lambda logs show errors.

**Common issues:**
- `Access Denied` on S3: Check Lambda IAM role has `s3:GetObject` permission
- `MessageRejected` on SES send: Verify the domain is SES-verified and in production mode
- `Email address is not verified`: SES is still in sandbox mode — request production access

### Bounced Emails

**Symptom:** Senders receive bounce notifications.

**Check:**
- SES receipt rule set is active
- MX record priority is correct (should be 10)
- No conflicting MX records from other providers

### Reply-To Not Working

**Symptom:** Replying to forwarded email doesn't go to original sender.

**Check:** The Lambda rewrites the `Reply-To` header to the original sender. If this isn't working, check Lambda logs for header rewriting errors.

## Cost Considerations

### Monthly Costs (Estimated)

| Service | Cost |
|---------|------|
| **SES Receiving** | Free (first 1,000 emails/month) |
| **SES Sending** | $0.10 per 1,000 emails |
| **S3 Storage** | ~$0.023/GB/month (auto-deleted after 7 days) |
| **Lambda** | Free tier covers 1M requests/month |
| **Route53 MX Record** | Included in hosted zone ($0.50/month) |

**Total estimated cost:** Under $1/month for typical low-volume email forwarding.

## Modifying Aliases

To add, remove, or change email aliases:

1. Edit `aws/lib/email/email-aliases.ts`
2. Deploy the stack:
   ```bash
   cd aws
   cdk deploy MannaGroupIntlEmailForwardingStack
   ```
   This updates the SES receipt rule recipients and the Lambda's email mapping.

## Security Considerations

- **TLS enforced** on incoming email via SES receipt rule `TlsPolicy.REQUIRE`
- **S3 bucket** is fully private (`BlockPublicAccess.BLOCK_ALL`)
- **Emails auto-deleted** from S3 after 7 days
- **DKIM-Signature** headers removed to prevent forwarding validation failures
- **Lambda** has minimal IAM permissions (S3 read + SES send)

## Stack Removal

To remove the email forwarding infrastructure:
```bash
# Deactivate the receipt rule set first
aws ses set-active-receipt-rule-set --region us-east-1

# Destroy the stack
cdk destroy MannaGroupIntlEmailForwardingStack
```

**Note:** The S3 bucket will be automatically emptied and deleted (`RemovalPolicy.DESTROY` with `autoDeleteObjects: true`).

---

**Last Updated:** 2026-10-14
**Maintained By:** DevOps Team
