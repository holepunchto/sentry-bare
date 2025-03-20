const { defineIntegration } = require('@sentry/core')
const os = require('bare-os')

exports.contextIntegration = defineIntegration(() => {
  return {
    name: 'Context',
    processEvent: (event) => {
      event.contexts = {
        ...event.contexts,

        os: {
          name: Bare.platform,
          release: os.release()
        },

        device: {
          arch: Bare.arch
        }
      }

      return event
    }
  }
})
