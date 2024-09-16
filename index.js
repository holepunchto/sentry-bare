const {
  addEventProcessor,
  addBreadcrumb,
  captureException,
  captureEvent,
  captureMessage,
  captureFeedback,
  close,
  createTransport,
  continueTrace,
  lastEventId,
  flush,
  getClient,
  isInitialized,
  getCurrentScope,
  getGlobalScope,
  getIsolationScope,
  setCurrentClient,
  Scope,
  SDK_VERSION,
  setContext,
  setExtra,
  setExtras,
  setTag,
  setTags,
  setUser,
  getSpanStatusFromHttpCode,
  setHttpStatus,
  withScope,
  withIsolationScope,
  captureCheckIn,
  withMonitor,
  setMeasurement,
  getActiveSpan,
  getRootSpan,
  getTraceData,
  getTraceMetaTags,
  startSpan,
  startInactiveSpan,
  startSpanManual,
  startNewTrace,
  metricsDefault: metrics,
  inboundFiltersIntegration,
  linkedErrorsIntegration,
  functionToStringIntegration,
  requestDataIntegration,
  captureConsoleIntegration,
  debugIntegration,
  dedupeIntegration,
  extraErrorDataIntegration,
  rewriteFramesIntegration,
  sessionTimingIntegration,
  zodErrorsIntegration,
  SEMANTIC_ATTRIBUTE_SENTRY_OP,
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
  startSession,
  captureSession,
  endSession,
  spanToJSON,
  spanToTraceHeader,
  spanToBaggageHeader
} = require('@sentry/core')

const { BareClient } = require('./lib/client')
const { makeFetchTransport } = require('./lib/transport')
const { init, getDefaultIntegrations } = require('./lib/sdk')
const { contextIntegration } = require('./lib/integrations/context')
const { onUncaughtExceptionIntegration } = require('./lib/integrations/on-uncaught-exception')
const { onUnhandledRejectionIntegration } = require('./lib/integrations/on-unhandled-rejection')

module.exports = {
  addEventProcessor,
  addBreadcrumb,
  captureException,
  captureEvent,
  captureMessage,
  captureFeedback,
  close,
  createTransport,
  continueTrace,
  lastEventId,
  flush,
  getClient,
  isInitialized,
  getCurrentScope,
  getGlobalScope,
  getIsolationScope,
  setCurrentClient,
  Scope,
  SDK_VERSION,
  setContext,
  setExtra,
  setExtras,
  setTag,
  setTags,
  setUser,
  getSpanStatusFromHttpCode,
  setHttpStatus,
  withScope,
  withIsolationScope,
  captureCheckIn,
  withMonitor,
  setMeasurement,
  getActiveSpan,
  getRootSpan,
  getTraceData,
  getTraceMetaTags,
  startSpan,
  startInactiveSpan,
  startSpanManual,
  startNewTrace,
  metricsDefault: metrics,
  inboundFiltersIntegration,
  linkedErrorsIntegration,
  functionToStringIntegration,
  requestDataIntegration,
  captureConsoleIntegration,
  debugIntegration,
  dedupeIntegration,
  extraErrorDataIntegration,
  rewriteFramesIntegration,
  sessionTimingIntegration,
  zodErrorsIntegration,
  SEMANTIC_ATTRIBUTE_SENTRY_OP,
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
  startSession,
  captureSession,
  endSession,
  spanToJSON,
  spanToTraceHeader,
  spanToBaggageHeader,

  BareClient,

  makeFetchTransport,

  init,
  getDefaultIntegrations,

  contextIntegration,
  onUncaughtExceptionIntegration,
  onUnhandledRejectionIntegration
}
