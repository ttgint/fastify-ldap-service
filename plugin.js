'use strict'

const fp = require('fastify-plugin')
const got = require('got')

/**
 *
 *
 * @param {fastify instance} fastify
 * @param {plugin options} opts
 * @param {call when you are done} next
 * @returns a decorated fastify instance
 */
function ldap (fastify, opts, next) {
  if (opts.provider == null) return next(Error('fastify-ldap-service: provider is required'))

  const provider = opts.provider

  if (typeof provider === 'string') {
    fastify.decorate('ldap', async function (username, password) {
      const response = await got.post(provider, {
        json: true,
        body: {
          username,
          password
        }
      })

      return response.body
    })
    return next()
  }

  if (typeof provider === 'function') {
    fastify.decorate('ldap', provider)
    return next()
  }

  return next(Error('fastify-ldap-service: provider must be a url or function'))
}

module.exports = fp(ldap, {
  fastify: '>=1.x',
  name: 'fastify-ldap-service'
})
