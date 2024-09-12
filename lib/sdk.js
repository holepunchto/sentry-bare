const { initAndBind } = require('@sentry/core')
const { createStackParser, nodeStackLineParser, stackParserFromStackParserOptions } = require('@sentry/utils')
const { BareClient } = require('./client')
const { makeTransport } = require('./transport')
const { contextIntegration } = require('./integrations/context')
const { globalHandlersIntegration } = require('./integrations/globalhandlers')

const defaultStackParser = createStackParser(nodeStackLineParser())

const getDefaultIntegrations = exports.getDefaultIntegrations = function getDefaultIntegrations () {
  return [
    contextIntegration(),
    globalHandlersIntegration()
  ]
}

exports.init = function init (opts) {
  const stackParser = stackParserFromStackParserOptions(opts.stackParser || defaultStackParser)
  const transport = opts.transport || makeTransport
  const integrations = opts.defaultIntegrations || getDefaultIntegrations()

  opts = {
    ...opts,
    stackParser,
    transport,
    integrations
  }

  return initAndBind(BareClient, opts)
}
