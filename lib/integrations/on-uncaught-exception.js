const { defineIntegration, captureException } = require('@sentry/core')
const { logErrorAndExit } = require('../utils/log-error-and-exit')

exports.onUncaughtExceptionIntegration = defineIntegration(() => {
  return {
    name: 'OnUncaughtException',
    setup: () => {
      Bare.on('uncaughtException', (err) => {
        try {
          captureException(err, {
            originalException: err,
            captureContext: {
              level: 'fatal'
            },
            mechanism: {
              handled: false,
              type: 'onuncaughtexception'
            }
          })
        } finally {
          if (Bare.listenerCount('uncaughtException') === 1) {
            logErrorAndExit(err)
          }
        }
      })
    }
  }
})
