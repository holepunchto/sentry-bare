/* global Bare */
const { defineIntegration, captureException } = require('@sentry/core')

exports.onUnhandledRejectionIntegration = defineIntegration(() => {
  return {
    name: 'OnUnhandledRejection',
    setup: () => {
      Bare
        .on('unhandledRejection', (reason, promise) => {
          captureException(reason, {
            originalException: promise,
            captureContext: {
              extra: { unhandledPromiseRejection: true }
            },
            mechanism: {
              handled: false,
              type: 'onunhandledrejection'
            }
          })
        })

      // TODO Log rejection, shutdown client, and exit
    }
  }
})
