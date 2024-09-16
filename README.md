# Sentry SDK for Bare

```
npm i bare-sentry
```

## Usage

```js
const Sentry = require('bare-sentry')

Sentry.init({ dsn: '__DSN__' })

Sentry.captureException(new Error('test'))
```

## Integrations

- `contextIntegration`
- `onUncaughtExceptionIntegration`
- `onUnhandledRejectionIntegration`

## License

Apache-2.0
