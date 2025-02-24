import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

let _auth: ReturnType<typeof betterAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = betterAuth({
      emailAndPassword: { requireEmailVerification: true, enabled: true },
      emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        async sendVerificationEmail({ user, url }, request) {
          if (request === undefined) {
            throw new Error('Request is undefined, cannot send email')
          }

          // This is the request as it is passed from `api/[...auth].ts` which is where
          // it is 'enhanced' with the runtimeConfig. Not a perfect solution.
          const enhanced: EnhancedRequest = request

          // TODO: I don't like this, but can't figure out a better way
          // to get access to the runtimeConfig properly in this function
          // on Cloudflare if the `event` isn't passed the env vars will be undefined
          // so just `useRuntimeConfig` will not work.
          const emails = useEmails(enhanced.__config!)

          await emails.sendAccountVerificationEmail({
            verificationUrl: url,
            to: {
              name: user.name,
              email: user.email,
            },
          })
        },
      },
      database: drizzleAdapter(useDrizzle(), {
        provider: 'sqlite',
        usePlural: true,
      }),
      advanced: {
        generateId: false,
      },
    })
  }

  return _auth
}
