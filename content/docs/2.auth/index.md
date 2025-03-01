---
title: "Authentication"
description: "Authentication Documentation"
---

# Authentication

Blanq uses the amazing [BetterAuth](https://better-auth.com) for authentication. This is a service that provides a lot of the boilerplate for authentication and user management.
If these docs are missing info on auth, look at the [BetterAuth Docs](https://www.better-auth.com/docs/integrations/nuxt).

## The User Object

TODO

## Features

### Registering Users

User registration follows the flow:

User registers -> Confirmation Email Sent -> Auth Middleware Redirects to Verify Email Page -> User Verifies Email -> User is directed to /app

### Logging In

Registered users can log in, but if their email is not verified, they will be redirected to the Verify Email page.
This page also has the option to resend the verification email if it was not received. Read more about how to configure emails [here](/docs/emails).

### Forgot Password

If users forget their password, they can request a password reset email. This email will contain a link to reset the password.
The link is valid for 1 hour. The user will be redirected to the login page after the password is reset.

