import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const fromEmail = process.env.SES_FROM_EMAIL || 'noreply@digitaldevops.io'

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: html,
          Charset: 'UTF-8',
        },
        ...(text && {
          Text: {
            Data: text,
            Charset: 'UTF-8',
          },
        }),
      },
    },
  })

  try {
    const response = await sesClient.send(command)
    return { success: true, messageId: response.MessageId }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

// Email templates
export function getInviteEmailHtml(params: {
  inviterName: string
  inviteLink: string
  message?: string
}) {
  const { inviterName, inviteLink, message } = params

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're invited to Digital DevOps</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #18181b;">
                Digital DevOps
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #18181b;">
                You've been invited!
              </h2>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #3f3f46;">
                <strong>${inviterName}</strong> has invited you to join Digital DevOps.
              </p>
              ${message ? `
              <div style="margin: 20px 0; padding: 16px; background-color: #f4f4f5; border-radius: 6px;">
                <p style="margin: 0; font-size: 14px; line-height: 22px; color: #52525b; font-style: italic;">
                  "${message}"
                </p>
              </div>
              ` : ''}
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #3f3f46;">
                Click the button below to accept your invitation and create your account.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${inviteLink}"
                       style="display: inline-block; padding: 14px 32px; background-color: #18181b; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500; border-radius: 6px;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 22px; color: #71717a;">
                This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <hr style="margin: 0 0 20px; border: none; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #a1a1aa; text-align: center;">
                Digital DevOps, Inc.<br>
                AI Enablement Consulting
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export function getMagicLinkEmailHtml(params: { magicLink: string }) {
  const { magicLink } = params

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to Digital DevOps</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #18181b;">
                Digital DevOps
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #18181b;">
                Sign in to your account
              </h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #3f3f46;">
                Click the button below to sign in to Digital DevOps. This link will expire in 24 hours.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${magicLink}"
                       style="display: inline-block; padding: 14px 32px; background-color: #18181b; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500; border-radius: 6px;">
                      Sign In
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 22px; color: #71717a;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <hr style="margin: 0 0 20px; border: none; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #a1a1aa; text-align: center;">
                Digital DevOps, Inc.<br>
                AI Enablement Consulting
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
