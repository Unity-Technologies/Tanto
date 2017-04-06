// FIXME: this should not be read from client side, but passed down to client
// in a script tag or similar

const envalid = require('envalid')

const { str, num, url } = envalid

const environment = envalid.cleanEnv(process.env, {
  HOST: str({ default: '0.0.0.0' }),
  PORT: num({ default: 3000 }),

  ONO_API_HOST: url({ default: 'http://127.0.0.1:5000' }),
  ONO_GRAPHQL_API_ROUTE: str({ default: '_admin/graphql' }),
  ONO_API_USERINFO: url({ default: 'http://127.0.0.1:5000/_admin/oauth/userinfo' }),
  ONO_OAUTH_CLIENT_ID: str({ default: 'foo' }),
  ONO_OAUTH_CLIENT_SECRET: str({ default: 'bar' }),
  ONO_AUTH_URL: url({ default: 'http://127.0.0.1:5000/_admin/oauth/login' }),
  ONO_AUTH_REQUEST_TOKEN_URL: url({ default: 'http://127.0.0.1:5000/_admin/oauth/token' }),

  REDIS_HOST: str({ default: '127.0.0.1' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_SESSION_PREFIX: str({ default: 'tanto_session' }),

  APP_NAME: str({ default: 'Tanto' }),
  APP_THEME: str({ default: 'cyan' }),

  SLACK_TOKEN: str({ default: '' }),
  SLACK_AVATARS_PREFETCH_SCHEDULE: str({ default: '0 0 1 * *' }),

  BFSTATS_API_HOST: str({ default: '' }),
  BFSTSTS_GTAPHQL_API_ROUTE: str({ default: 'graphql' }),

  KATANA_NOST: str({ default: '' }),
})

module.exports = environment
