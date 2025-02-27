import { render } from '@vue-email/render'
import { z } from 'zod'
import AccountConfirmationEmail from '../emails/AccountConfirmationEmail.vue'
import EmailChangeEmail from '../emails/ChangeEmailEmail.vue'
import PasswordResetEmail from '../emails/PasswordResetEmail.vue'

const emailMessageSchema = z.object({
  to: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  subject: z.string(),
  html: z.string(),
})

export type EmailMessage = z.infer<typeof emailMessageSchema>

const sendAccountVerificationEmailSchema = z.object({
  to: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  verificationUrl: z.string().url(),
})

type SendAccountVerificationEmailOptions = z.infer<typeof sendAccountVerificationEmailSchema>

const sendPasswordResetEmailSchema = z.object({
  to: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  resetUrl: z.string().url(),
})

type SendPasswordResetEmailOptions = z.infer<typeof sendPasswordResetEmailSchema>

const sendEmailChangeEmailSchema = sendPasswordResetEmailSchema.extend({
  newEmail: z.string().email(),
})

type SendEmailChangeEmailOptions = z.infer<typeof sendEmailChangeEmailSchema>

interface UseEmailsConfig {
  mailChannelsBaseUrl: string
  mailChannelsApiKey: string
  mailSenderEmail: string
  mailSenderName: string
}

export function useEmails(config: UseEmailsConfig) {
  const {
    mailChannelsBaseUrl,
    mailChannelsApiKey,
    mailSenderEmail,
    mailSenderName,
  } = config

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
  async function sendAccountVerificationEmail(options: SendAccountVerificationEmailOptions) {
    const params = sendAccountVerificationEmailSchema.parse(options)

    const emailMessage = await render(AccountConfirmationEmail, {
      confirmationLink: params.verificationUrl,
    })

    const message: EmailMessage = {
      to: params.to,
      subject: 'Verify Your Account',
      html: emailMessage,
    }

    return sendEmail(message)
  }

  async function sendPasswordResetEmail(options: SendPasswordResetEmailOptions) {
    const params = sendPasswordResetEmailSchema.parse(options)

    const emailMessage = await render(PasswordResetEmail, {
      resetUrl: params.resetUrl,
    })

    const message: EmailMessage = {
      to: params.to,
      subject: 'Reset Your Password',
      html: emailMessage,
    }

    return sendEmail(message)
  }

  async function sendEmailChangeEmail(options: SendEmailChangeEmailOptions) {
    const params = sendEmailChangeEmailSchema.parse(options)

    const emailMessage = await render(EmailChangeEmail, {
      resetUrl: params.resetUrl,
      newEmail: params.newEmail,
    })

    const message: EmailMessage = {
      to: params.to,
      subject: 'Verify your email change',
      html: emailMessage,
    }

    return sendEmail(message)
  }

  return {
    sendAccountVerificationEmail,
    sendPasswordResetEmail,
    sendEmailChangeEmail,
  }
}
