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

- Global Handlers (`Bare.on('uncaughtException')`, `Bare.on('unhandledRejection')`)
- Context (machine, os)

## License

Apache-2.0
