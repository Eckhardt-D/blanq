# Blanq - The Nuxt (Hub) Starter

Blanq is a project to get a Nuxt app up and running as quick as possible. The project uses an opinionated list of packages, configurations, vendors and services.
The idea is to be able just to replace some items in the `app.config.ts` and have the basis for your app set up.

Instead of having to always rewrite stuff like:

- Authentication
- Common Database schema and ORM setup
- Email sending
- File uploading
- Queues
- Stripe Payments / Products / Subscriptions

You have it out of the box, ready to be tweaked for your needs.

# Development

First install all the dependencies

```bash
bun install
```

> [!NOTE]
> Currently some issues with native deps and cross-platform installs.
> Remove `bun.lock` and node_modules and try again if you run into issues.

Ensure you've copied and filled the necessary env vars from `.env.example` to `.env`.

Quick way to generate the better auth secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Most of the application boilerplate be easily updated via the `app/app.config.ts` file.

## Start the local mail server

Please see [This Repo](https://github.com/eckhardt-d/mailchannels-dev) for more information on how to start a local mailbox and sender.
Alternatively you could always use your real MailChannels account API key and URL in the .env file.

```bash
docker run -d -p 8008:8008 mailchannels-dev
```

## Start the app

This will automatically run the migrations for you if it's the first time you're running the app.

```bash
bun run dev
```
