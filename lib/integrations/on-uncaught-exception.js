/* global Bare */
const { defineIntegration, captureException } = require('@sentry/core')
const { logErrorAndExit } = require('../utils/log-error-and-exit')

exports.onUncaughtExceptionIntegration = defineIntegration(() => {
  return {
    name: 'OnUncaughtException',
    setup: (client) => {
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

          const noOtherListeners = Bare.listeners('uncaughtException').length === 1
          const forceExit = client.getOptions().exitEvenIfOtherHandlersAreRegistered

          if (forceExit || noOtherListeners) logErrorAndExit(err)
        })
    }
  }
})
