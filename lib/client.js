const { ServerRuntimeClient, applySdkMetadata } = require('@sentry/core')
const { hostname } = require('bare-os')

exports.BareClient = class BareClient extends ServerRuntimeClient {
  constructor (opts) {
    applySdkMetadata(opts, 'bare')

    opts = {
      ...opts,
      platform: 'javascript',
      runtime: { name: 'bare', version: Bare.version },
      serverName: opts.serverName || hostname()
    }

    super(opts)
  }
}
