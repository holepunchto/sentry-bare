/* global Bare */
const { defineIntegration, captureException } = require('@sentry/core')

exports.onUncaughtExceptionIntegration = defineIntegration(() => {
  return {
    name: 'OnUncaughtException',
    setup: () => {
      Bare
        .on('uncaughtException', (err) => {
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
        })

      // TODO Log exception, shutdown client, and exit
    }
  }
})
