/* global Bare */
const { getClient } = require('@sentry/core')

exports.logErrorAndExit = async function logErrorAndExit (err) {
  console.error(err)

  const client = getClient()
  if (client === undefined) Bare.exit(0)

  const opts = client.getOptions()
  const timeout = (opts && opts.shutdownTimeout) || 2000

  try {
    await client.close(timeout)
  } finally {
    Bare.exit(0)
  }
}
