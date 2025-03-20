/* global Bare */
const { ServerRuntimeClient, applySdkMetadata } = require('@sentry/core')
const os = require('bare-os')

exports.BareClient = class BareClient extends ServerRuntimeClient {
  constructor(opts) {
    applySdkMetadata(opts, 'bare')

    super({
      ...opts,
      platform: 'javascript',
      runtime: { name: 'bare', version: Bare.version },
      serverName: opts.serverName || os.hostname()
    })
  }
}
