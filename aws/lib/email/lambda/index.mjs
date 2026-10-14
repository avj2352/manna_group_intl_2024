import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

const s3 = new S3Client();
const ses = new SESClient();

const EMAIL_MAPPING = JSON.parse(process.env.EMAIL_MAPPING || "{}");
const DOMAIN = process.env.DOMAIN || "";

export const handler = async (event) => {
  const record = event.Records[0];
  const sesEvent = record.ses;
  const messageId = sesEvent.mail.messageId;
  const bucket = process.env.S3_BUCKET;
  const recipients = sesEvent.receipt.recipients;

  const forwardAddresses = recipients
    .map((r) => EMAIL_MAPPING[r.toLowerCase()])
    .filter(Boolean);

  if (forwardAddresses.length === 0) {
    console.log("No forwarding address found for recipients:", recipients);
    return { status: "skip" };
  }

  const { Body } = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: messageId })
  );
  let rawEmail = await Body.transformToString();

  const originalFrom = sesEvent.mail.commonHeaders.from?.[0] || "unknown";
  const originalSubject = sesEvent.mail.commonHeaders.subject || "(no subject)";

  for (const forwardTo of forwardAddresses) {
    const matchedAlias = recipients.find(
      (r) => EMAIL_MAPPING[r.toLowerCase()] === forwardTo
    );
    const fromAlias = matchedAlias || `noreply@${DOMAIN}`;

    let modified = rawEmail;

    // Replace Return-Path
    modified = modified.replace(
      /^Return-Path:.*$/im,
      `Return-Path: <${fromAlias}>`
    );

    // Replace From header — preserve display name from original sender
    const fromDisplay = originalFrom.replace(/<[^>]+>/, "").trim() || "Forwarded";
    modified = modified.replace(
      /^From:.*$/im,
      `From: "${fromDisplay}" <${fromAlias}>`
    );

    // Replace To header with the forward target
    modified = modified.replace(/^To:.*$/im, `To: <${forwardTo}>`);

    // Add or replace Reply-To with original sender
    if (/^Reply-To:.*$/im.test(modified)) {
      modified = modified.replace(/^Reply-To:.*$/im, `Reply-To: ${originalFrom}`);
    } else {
      modified = modified.replace(
        /^From:.*$/im,
        (match) => `${match}\nReply-To: ${originalFrom}`
      );
    }

    // Remove DKIM-Signature headers to avoid validation failures
    modified = modified.replace(/^DKIM-Signature:[\s\S]*?(?=^\S)/gm, "");

    // Prepend forwarding info to subject if not already present
    if (!/^\[Fwd\]/.test(originalSubject)) {
      modified = modified.replace(
        /^Subject:.*$/im,
        `Subject: [Fwd] ${originalSubject}`
      );
    }

    console.log(
      `Forwarding email ${messageId} from ${originalFrom} to ${forwardTo} via ${fromAlias}`
    );

    await ses.send(
      new SendRawEmailCommand({
        Source: fromAlias,
        Destinations: [forwardTo],
        RawMessage: { Data: new TextEncoder().encode(modified) },
      })
    );
  }

  return { status: "forwarded", messageId };
};
