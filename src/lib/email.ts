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

// Contact form notification email (sent to team)
export function getContactNotificationEmailHtml(params: {
  name: string
  email: string
  company: string
  role?: string
  service: string
  budget?: string
  timeline?: string
  message: string
}) {
  const { name, email, company, role, service, budget, timeline, message } = params

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background-color: #0f172a; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">
                New Lead: ${name}
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #94a3b8;">
                ${company} • ${service}
              </p>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding: 24px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #18181b; text-transform: uppercase; letter-spacing: 0.5px;">
                Contact Information
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Name</span><br>
                    <span style="color: #18181b; font-size: 16px; font-weight: 500;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Email</span><br>
                    <a href="mailto:${email}" style="color: #2563eb; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Company</span><br>
                    <span style="color: #18181b; font-size: 16px; font-weight: 500;">${company}</span>
                  </td>
                </tr>
                ${role ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Role</span><br>
                    <span style="color: #18181b; font-size: 16px; font-weight: 500;">${role}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Project Details -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #18181b; text-transform: uppercase; letter-spacing: 0.5px;">
                Project Details
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Service Interest</span><br>
                    <span style="color: #18181b; font-size: 16px; font-weight: 500;">${service}</span>
                  </td>
                </tr>
                ${budget ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Budget Range</span><br>
                    <span style="color: #18181b; font-size: 16px; font-weight: 500;">${budget}</span>
                  </td>
                </tr>
                ` : ''}
                ${timeline ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 14px;">Timeline</span><br>
                    <span style="color: #18181b; font-size: 16px; font-weight: 500;">${timeline}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #18181b; text-transform: uppercase; letter-spacing: 0.5px;">
                Message
              </h2>
              <div style="padding: 16px; background-color: #f4f4f5; border-radius: 6px;">
                <p style="margin: 0; font-size: 14px; line-height: 22px; color: #3f3f46; white-space: pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your inquiry to Digital DevOps"
                       style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500; border-radius: 6px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f4f4f5; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #71717a; text-align: center;">
                Submitted via digitaldevops.io contact form<br>
                ${new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' })} PT
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

// Contact form confirmation email (sent to user)
export function getContactConfirmationEmailHtml(params: {
  name: string
  service: string
}) {
  const { name, service } = params

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out!</title>
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
                Thanks for reaching out, ${name}!
              </h2>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #3f3f46;">
                We've received your inquiry about <strong>${service}</strong> and will get back to you within 24 hours.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #3f3f46;">
                In the meantime, here are some resources you might find helpful:
              </p>

              <!-- Resources -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f4f4f5; border-radius: 6px; margin-bottom: 8px;">
                    <a href="https://digitaldevops.io/pricing" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                      View Our Pricing &rarr;
                    </a>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #71717a;">
                      Transparent, fixed-price packages for every need
                    </p>
                  </td>
                </tr>
              </table>
              <div style="height: 8px;"></div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f4f4f5; border-radius: 6px;">
                    <a href="https://digitaldevops.io/docs" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                      Browse Resources &rarr;
                    </a>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #71717a;">
                      Guides, case studies, and tools
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <hr style="margin: 0 0 20px; border: none; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 14px; line-height: 22px; color: #71717a;">
                Questions? Reply to this email or reach us at <a href="mailto:hello@digitaldevops.io" style="color: #2563eb;">hello@digitaldevops.io</a>
              </p>
              <p style="margin: 16px 0 0; font-size: 12px; line-height: 18px; color: #a1a1aa;">
                Digital DevOps, Inc.<br>
                AI-Augmented AWS & DevOps Consulting
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
