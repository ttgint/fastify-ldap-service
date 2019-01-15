const test = require('tap').test
const plugin = require('./plugin')
const Fastify = require('fastify')

test('should error if no opts are provided', (t) => {
  t.plan(1)

  const fastify = Fastify()

  fastify.register(plugin)

  fastify.ready(err => {
    t.is(err.message, 'fastify-ldap-service: provider is required')
    fastify.close()
  })
})

test('should use supplied provider function', (t) => {
  t.plan(2)

  const fastify = Fastify()

  fastify.register(plugin, { provider: () => ({ name: 'john', department: 'engineering' }) })

  fastify.ready(err => {
    t.error(err)
    const result = fastify.ldap('dummy', 'dummy')
    t.strictSame(result, { name: 'john', department: 'engineering' })
    fastify.close()
  })
})

test('provider must be a function', (t) => {
  t.plan(1)

  const fastify = Fastify()

  fastify.register(plugin, { provider: 3 })

  fastify.ready(err => {
    t.is(err.message, 'fastify-ldap-service: provider must be a url or function')
    fastify.close()
  })
})

test('should use url', (t) => {
  t.plan(2)

  const fastify = Fastify()

  fastify.register(plugin, { provider: 'https://jsonplaceholder.typicode.com/posts' })

  fastify.ready(err => {
    t.error(err)
    fastify.ldap('dummy', 'dummy').then(result => {
      t.strictSame(result, { username: 'dummy', password: 'dummy', id: 101 })
      fastify.close()
    })
  })
})
