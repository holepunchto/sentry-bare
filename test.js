const test = require('brittle')
const http = require('bare-http1')
const Sentry = require('.')

test('init returns a client', async (t) => {
  const { dsn } = await createTestServer(t)

  const client = Sentry.init({
    dsn,
    defaultIntegrations: []
  })

  t.ok(client)
  t.ok(client instanceof Sentry.BareClient)

  await client.close()
})

test('getDefaultIntegrations returns integrations', (t) => {
  const integrations = Sentry.getDefaultIntegrations()

  t.ok(Array.isArray(integrations))
  t.is(integrations.length, 3)

  const names = integrations.map((i) => i.name)
  t.ok(names.includes('Context'))
  t.ok(names.includes('OnUncaughtException'))
  t.ok(names.includes('OnUnhandledRejection'))
})

test('captureException sends an error envelope', async (t) => {
  t.plan(3)

  const { dsn } = await createTestServer(t, (body) => {
    t.ok(body.length > 0, 'envelope body is not empty')
    t.ok(body.includes('"type":"event"'), 'envelope contains event type')
    t.ok(body.includes('test error'), 'envelope contains error message')
  })

  const client = Sentry.init({
    dsn,
    defaultIntegrations: []
  })

  Sentry.captureException(new Error('test error'))

  await client.flush(5000)
  await client.close()
})

test('captureMessage sends a message envelope', async (t) => {
  t.plan(2)

  const { dsn } = await createTestServer(t, (body) => {
    t.ok(body.includes('"type":"event"'), 'envelope contains event type')
    t.ok(body.includes('hello sentry'), 'envelope contains message')
  })

  const client = Sentry.init({
    dsn,
    defaultIntegrations: []
  })

  Sentry.captureMessage('hello sentry')

  await client.flush(5000)
  await client.close()
})

test('contextIntegration enriches events', async (t) => {
  t.plan(2)

  const { dsn } = await createTestServer(t, (body) => {
    t.ok(body.includes(Bare.platform), 'event contains os platform')
    t.ok(body.includes(Bare.arch), 'event contains device arch')
  })

  const client = Sentry.init({
    dsn,
    defaultIntegrations: [Sentry.contextIntegration()]
  })

  Sentry.captureMessage('context test')

  await client.flush(5000)
  await client.close()
})

test('makeFetchTransport delivers to server', async (t) => {
  t.plan(1)

  const { dsn } = await createTestServer(t, (body) => {
    t.ok(body.length > 0, 'transport delivered envelope')
  })

  const client = Sentry.init({
    dsn,
    transport: Sentry.makeFetchTransport,
    defaultIntegrations: []
  })

  Sentry.captureMessage('transport test')

  await client.flush(5000)
  await client.close()
})

test('setUser attaches user to events', async (t) => {
  t.plan(1)

  const { dsn } = await createTestServer(t, (body) => {
    t.ok(body.includes('test@example.com'), 'envelope contains user email')
  })

  const client = Sentry.init({
    dsn,
    defaultIntegrations: []
  })

  Sentry.setUser({ email: 'test@example.com' })
  Sentry.captureMessage('user test')

  await client.flush(5000)
  await client.close()
})

test('setTag attaches tags to events', async (t) => {
  t.plan(1)

  const { dsn } = await createTestServer(t, (body) => {
    t.ok(body.includes('my-tag'), 'envelope contains tag')
  })

  const client = Sentry.init({
    dsn,
    defaultIntegrations: []
  })

  Sentry.setTag('my-tag', 'my-value')
  Sentry.captureMessage('tag test')

  await client.flush(5000)
  await client.close()
})

function createTestServer(t, onenvelope = () => {}) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const body = []

      req
        .on('data', (chunk) => body.push(chunk))
        .on('end', () => {
          onenvelope(Buffer.concat(body).toString(), req)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end('{}')
        })
    })

    server.on('error', reject).listen(0, () => {
      const { port } = server.address()

      const dsn = `http://key@localhost:${port}/1`

      t.teardown(() => server.close())

      resolve({ server, dsn, port })
    })
  })
}
