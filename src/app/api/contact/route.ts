import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import {
  sendEmail,
  getContactNotificationEmailHtml,
  getContactConfirmationEmailHtml,
} from '@/lib/email'

const TEAM_EMAIL = process.env.CONTACT_FORM_EMAIL || 'hello@digitaldevops.io'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactFormSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: validatedData.error.issues,
        },
        { status: 400 }
      )
    }

    const data = validatedData.data

    // Log the submission
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      messageLength: data.message.length,
      timestamp: new Date().toISOString(),
    })

    // Send notification email to team
    try {
      await sendEmail({
        to: TEAM_EMAIL,
        subject: `New Lead: ${data.name} from ${data.company} - ${data.service}`,
        html: getContactNotificationEmailHtml({
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
        }),
      })
    } catch (emailError) {
      console.error('Failed to send team notification:', emailError)
      // Continue processing - don't fail the request if team email fails
    }

    // Send confirmation email to user
    try {
      await sendEmail({
        to: data.email,
        subject: `Thanks for contacting Digital DevOps!`,
        html: getContactConfirmationEmailHtml({
          name: data.name.split(' ')[0], // First name only
          service: data.service,
        }),
      })
    } catch (emailError) {
      console.error('Failed to send user confirmation:', emailError)
      // Continue processing - don't fail the request if confirmation email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
