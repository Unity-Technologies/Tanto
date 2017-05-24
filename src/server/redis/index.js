/* eslint-disable no-console */
import redis from 'redis'
import env from '../config'

let client

export const handleError = error => console.error(error)

const redisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  prefix: env.REDIS_SESSION_PREFIX,
}

export const redisClient = {
  client: () => {
    if (!client) {
      client = redis.createClient(redisOptions)
      client.unref()
      client.on('error', handleError)
    }
    return client
  },
  quit: () => {
    if (client) {
      client.quit()
      client = null
    }
  },
}

export default redisClient
