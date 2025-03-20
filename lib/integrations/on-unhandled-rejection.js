/* global Bare */
const { defineIntegration, captureException } = require('@sentry/core')
const { logErrorAndExit } = require('../utils/log-error-and-exit')

exports.onUnhandledRejectionIntegration = defineIntegration(() => {
  return {
    name: 'OnUnhandledRejection',
    setup: () => {
      Bare.on('unhandledRejection', (reason, promise) => {
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

        if (Bare.listenerCount('unhandledRejection') === 1)
          logErrorAndExit(reason)
      })
    }
  }
})
