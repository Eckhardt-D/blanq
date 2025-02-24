import type { H3Event } from 'h3'
import { render } from '@vue-email/render'
import { z } from 'zod'
import AccountConfirmationEmail from '../emails/AccountConfirmationEmail.vue'

const emailMessageSchema = z.object({
  to: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  subject: z.string(),
  html: z.string(),
})

export type EmailMessage = z.infer<typeof emailMessageSchema>

export function useEmails(event: H3Event) {
  const {
    mailChannelsBaseUrl,
    mailChannelsApiKey,
    mailSenderEmail,
    mailSenderName,
  } = useRuntimeConfig(event)

  async function sendEmail(message: EmailMessage) {
    message = emailMessageSchema.parse(message)

    const url = `${mailChannelsBaseUrl}/tx/v1/send`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Api-Key': mailChannelsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: message.subject,
        from: {
          name: mailSenderName,
          email: mailSenderEmail,
        },
        content: [{
          type: 'text/html',
          value: message.html,
        }],
        personalizations: [{
          to: [{ name: message.to.name, email: message.to.email }],
        }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Email send failed: ${response.status}`)
    }

    const data = await response.json()

    return {
      messageId: data.message_id,
      status: data.results?.[0]?.status,
    }
  }

  // TODO: Implement this function for realzies
  async function sendAccountVerificationEmail() {
    const emailMessage = await render(AccountConfirmationEmail, {
      confirmationLink: 'http://localhost:3000/api/users/confirm?token=123',
    })

    const message: EmailMessage = {
      to: { name: 'Test User', email: 'test@test.test' },
      subject: 'Verify Your Account',
      html: emailMessage,
    }

    return sendEmail(message)
  }

  return {
    sendAccountVerificationEmail,
  }
}
