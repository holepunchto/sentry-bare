const { initAndBind } = require('@sentry/core')
const {
  createStackParser,
  nodeStackLineParser,
  stackParserFromStackParserOptions
} = require('@sentry/utils')
const { BareClient } = require('./client')
const { makeFetchTransport } = require('./transport')
const { contextIntegration } = require('./integrations/context')
const {
  onUncaughtExceptionIntegration
} = require('./integrations/on-uncaught-exception')
const {
  onUnhandledRejectionIntegration
} = require('./integrations/on-unhandled-rejection')

const defaultStackParser = createStackParser(nodeStackLineParser())

const getDefaultIntegrations = (exports.getDefaultIntegrations =
  function getDefaultIntegrations() {
    return [
      contextIntegration(),
      onUncaughtExceptionIntegration(),
      onUnhandledRejectionIntegration()
    ]
  })

exports.init = function init(opts) {
  const stackParser = stackParserFromStackParserOptions(
    opts.stackParser || defaultStackParser
  )
  const transport = opts.transport || makeFetchTransport
  const integrations = opts.defaultIntegrations || getDefaultIntegrations()

  return initAndBind(BareClient, {
    ...opts,
    stackParser,
    transport,
    integrations
  })
}
