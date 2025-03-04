import type { H3Event } from 'h3'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

function createAuth() {
  return betterAuth({
    user: {
      additionalFields: {
        stripeCustomerId: {
          type: 'string',
          input: false,
        },
      },
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ user, newEmail, url }, request) => {
          if (request === undefined) {
            throw new Error('Request is undefined, cannot send email')
          }

          // This is the request as it is passed from `api/[...auth].ts` which is where
          // it is 'enhanced' with the runtimeConfig. Not a perfect solution.
          const enhanced: EnhancedRequest = request
          const emails = useEmails(enhanced.__config!)

          await emails.sendEmailChangeEmail({
            newEmail,
            resetUrl: url,
            to: {
              name: user.name,
              email: user.email,
            },
          })
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      async sendResetPassword({ user, url }, request) {
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

        await emails.sendPasswordResetEmail({
          resetUrl: url,
          to: {
            name: user.name,
            email: user.email,
          },
        })
      },
    },
    emailVerification: {
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
    // Issues when updating user in db, session is not updated

    // secondaryStorage: {
    //   get: key => hubKV().getItemRaw(`_auth:${key}`),
    //   set: (key, value, ttl) => {
    //     return hubKV().set(`_auth:${key}`, value, { ttl })
    //   },
    //   delete: key => hubKV().del(`_auth:${key}`),
    // },
    advanced: {
      generateId: false,
    },
  })
}

let _auth: ReturnType<typeof createAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = createAuth()
  }

  return _auth
}

/**
 *  Get the user from the event or throw an error if the user is not authenticated.
 */
export function getUserOrThrow(event: H3Event) {
  if (!event.context.auth.isAuthenticated) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
    })
  }

  return event.context.auth.user
}

/**
 * Just checks whether the user is authenticated or not.
 * Throws 401 error if the user is not authenticated.
 */
export function requireAuth(event: H3Event): void {
  if (!event.context.auth.isAuthenticated) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
    })
  }
}

export type User = typeof _auth.$Infer.Session.user
