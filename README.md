# ttgint/fastify-ldap-service

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/ttgint/fastify-ldap-service.svg?branch=master)](https://travis-ci.org/ttgint/fastify-ldap-service)

# Install

> npm install --save @ttgint/fastify-ldap-service

# Usage

```js
fastify.register(require('@ttgint/fastify-ldap-service'), { provider: 'https://post/endpoint' })
```

then

```js
const result = await fastify.ldap(username, password)
```

will send your `username` and `password` as a `POST` request to the provided url and return the result.

For testing purposes you can also use a custom function as the provider such as

```js
fastify.register(require('@ttgint/fastify-ldap-service'), { provider: () => ({ name: 'dummy', department: 'test' }) })
```

## License

MIT
