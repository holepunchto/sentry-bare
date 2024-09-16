/* global Bare */
const { defineIntegration, captureException } = require('@sentry/core')
const { logErrorAndExit } = require('../utils/log-error-and-exit')

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

          const noOtherListeners = Bare.listeners('unhandledRejection').length === 1
          if (noOtherListeners) logErrorAndExit(reason)
        })
    }
  }
})
