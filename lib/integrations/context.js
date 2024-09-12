const { defineIntegration } = require('@sentry/core')

function addContext (event) {
  event.contexts = {
    machine: {
      platform: Bare.platform,
      architecture: Bare.arch
    },
    v8: {
      version: Bare.versions.v8
    },
    uv: {
      version: Bare.versions.uv
    },
    ...event.contexts
  }

  return event
}

const integration = () => ({
  name: 'BareContext',
  processEvent: addContext
})

exports.contextIntegration = defineIntegration(integration)
