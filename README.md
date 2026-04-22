# sentry-bare

Sentry SDK for Bare, built on top of `@sentry/core`. It provides error capturing, context enrichment, and transport via `bare-fetch`, with built-in handling of uncaught exceptions and unhandled rejections.

```
npm i sentry-bare
```

## Usage

`instrument.js`

```js
const Sentry = require('sentry-bare')

Sentry.init({ dsn: '__DSN__' })
```

`index.js`

```js
require('./instrument')

throw new Error('boom!')
```

## API

#### `Sentry.init(options)`

Initializes the Sentry SDK for Bare. Accepts the standard Sentry options object with the following Bare-specific defaults:

- `transport` defaults to `makeFetchTransport`
- `stackParser` defaults to a Node.js-compatible stack parser
- `defaultIntegrations` defaults to `getDefaultIntegrations()`

Options include all standard `@sentry/core` options such as `dsn`, `tracesSampleRate`, `environment`, `release`, etc.

#### `getDefaultIntegrations()`

Returns the default integrations for the Bare SDK:

- `contextIntegration()` — enriches events with OS and device context
- `onUncaughtExceptionIntegration()` — captures uncaught exceptions
- `onUnhandledRejectionIntegration()` — captures unhandled promise rejections

#### `new BareClient(options)`

A Sentry client for the Bare runtime, extending `ServerRuntimeClient` from `@sentry/core`. Sets the platform to `'javascript'`, the runtime to `'bare'`, and defaults `serverName` to the system hostname.

#### `makeFetchTransport(options)`

Creates a Sentry transport that sends envelopes to Sentry using `bare-fetch`. Accepts the standard Sentry transport options.

#### `contextIntegration()`

Integration that enriches events with OS name, OS release, and device architecture from the Bare runtime.

#### `onUncaughtExceptionIntegration()`

Integration that listens for `uncaughtException` events on `Bare` and captures them as fatal errors. If no other `uncaughtException` listeners are registered, the process will exit after capturing.

#### `onUnhandledRejectionIntegration()`

Integration that listens for `unhandledRejection` events on `Bare` and captures the rejection reason. If no other `unhandledRejection` listeners are registered, the process will exit after capturing.

All other exports are re-exported from `@sentry/core`, including `captureException`, `captureMessage`, `captureEvent`, `setUser`, `setTag`, `setExtra`, `withScope`, `startSpan`, `flush`, `close`, and more. See the `@sentry/core` documentation for details.

## License

Apache-2.0
