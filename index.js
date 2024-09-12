const { captureException, captureEvent, captureMessage } = require('@sentry/core')
const { SDK_VERSION } = require('@sentry/utils')

const { BareClient } = require('./lib/client')
const { contextIntegration } = require('./lib/integrations/context')
const { globalHandlersIntegration } = require('./lib/integrations/globalhandlers')
const { init } = require('./lib/sdk')
const { makeTransport } = require('./lib/transport')

module.exports = {
  captureException,
  captureEvent,
  captureMessage,
  SDK_VERSION,

  BareClient,
  contextIntegration,
  globalHandlersIntegration,
  init,
  makeTransport
}
