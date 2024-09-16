const { createTransport } = require('@sentry/core')
const { rejectedSyncPromise } = require('@sentry/utils')
const fetch = require('bare-fetch')

exports.makeFetchTransport = function makeFetchTransport (opts) {
  async function makeRequest (req) {
    try {
      const res = await fetch(opts.url, {
        method: 'POST',
        body: req.body,
        headers: opts.headers
      })

      return {
        statusCode: res.status,
        headers: {
          'x-sentry-rate-limits': res.headers.get('X-Sentry-Rate-Limits'),
          'retry-after': res.headers.get('Retry-After')
        }
      }
    } catch (err) {
      return rejectedSyncPromise(err)
    }
  }

  return createTransport(opts, makeRequest)
}
