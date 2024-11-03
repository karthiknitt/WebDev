import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a2e17e3b784b8ca06a0bb155ec5167aa@o4508232436547584.ingest.de.sentry.io/4508232450965584",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
