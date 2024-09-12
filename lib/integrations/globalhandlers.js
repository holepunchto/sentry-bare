const { defineIntegration, captureException } = require('@sentry/core')

function addGlobalHandlers (client) {
  Bare.on('uncaughtException', (err) => {
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
  })
}

const integration = () => ({
  name: 'GlobalHandlers',
  setup: addGlobalHandlers
})

exports.globalHandlersIntegration = defineIntegration(integration)
