const { captureException, captureEvent, captureMessage } = require('@sentry/core')
const { SDK_VERSION } = require('@sentry/utils')

const { BareClient } = require('./lib/client')
const { init } = require('./lib/sdk')
const { makeFetchTransport } = require('./lib/transport')
const { contextIntegration } = require('./lib/integrations/context')
const { onUncaughtExceptionIntegration } = require('./lib/integrations/on-uncaught-exception')
const { onUnhandledRejectionIntegration } = require('./lib/integrations/on-unhandled-rejection')

module.exports = {
  captureException,
  captureEvent,
  captureMessage,
  SDK_VERSION,

  BareClient,
  init,
  makeFetchTransport,
  contextIntegration,
  onUncaughtExceptionIntegration,
  onUnhandledRejectionIntegration
}
