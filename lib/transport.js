const { createTransport } = require('@sentry/core')
const { rejectedSyncPromise } = require('@sentry/utils')
const fetch = require('bare-fetch')

exports.makeTransport = function makeTransport (opts) {
  async function makeRequest (req) {
    const reqOpts = {
      method: 'POST',
      body: req.body,
      headers: opts.headers
    }

    try {
      const res = await fetch(opts.url, reqOpts)
      return { statusCode: res.status }
    } catch (err) {
      return rejectedSyncPromise(err)
    }
  }

  return createTransport(opts, makeRequest)
}
