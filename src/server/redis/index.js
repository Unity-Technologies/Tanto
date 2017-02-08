/* eslint-disable no-console */
import redis from 'redis'

let client

export const handleError = (error) => console.error(error)

export const redisClient = {
  client: () => {
    if (!client) {
      client = redis.createClient()
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
