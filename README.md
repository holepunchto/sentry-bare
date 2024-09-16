# Sentry SDK for Bare

```
npm i sentry-bare
```

## Usage

```js
const Sentry = require('sentry-bare')

Sentry.init({ dsn: '__DSN__' })

Sentry.captureException(new Error('test'))
```

## Integrations

- `contextIntegration`
- `onUncaughtExceptionIntegration`
- `onUnhandledRejectionIntegration`

## License

Apache-2.0
