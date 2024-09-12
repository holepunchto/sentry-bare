# Sentry SDK for Bare

```sh
npm i bare-sentry
```

## Usage

```js
// CJS Syntax
const Sentry = require('bare-sentry')
// ESM Syntax
import * as Sentry from 'bare-sentry'

Sentry.init({ dsn: '__DSN__' })

Sentry.captureException(new Error('test'))
```

## Integrations

- Global Handlers (`Bare.on('uncaughtException')`, `Bare.on('unhandledRejection')`)
- Context (machine, os)

## License

Apache-2.0
