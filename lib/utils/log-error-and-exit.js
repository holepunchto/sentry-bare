const { getClient } = require('@sentry/core')
const abort = require('bare-abort')

exports.logErrorAndExit = async function logErrorAndExit(err) {
  console.error(err)

  const client = getClient()
  if (client === undefined) abort()

  const opts = client.getOptions()
  const timeout = (opts && opts.shutdownTimeout) || 2000

  try {
    await client.close(timeout)
  } finally {
    abort()
  }
}
