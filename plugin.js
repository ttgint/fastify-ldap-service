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
  if (opts.url == null && opts.provider == null) {
    return next(Error('fastify-ldap-service: service url or provider function must be given'))
  }

  if (opts.url != null) {
    fastify.decorate('ldap', async function (username, password) {
      const response = await got.post(opts.url, {
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

  if (typeof opts.provider !== 'function') {
    return next(Error('fastify-ldap-service: provider must be a function'))
  }

  fastify.decorate('ldap', opts.provider)
  return next()
}

module.exports = fp(ldap, {
  fastify: '>=1.x',
  name: 'fastify-ldap-service'
})
