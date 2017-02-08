/* eslint-disable no-console */
import redis from '../redis'

const client = redis.client()

export const findById = (id, done) => {
  client.hgetall(id, done)
}

export const save = (user, done) => {
  client.hmset(user.id, [
    'name', user.name,
    'token', user.token,
    'id', user.id,
    'username', user.username,
    'email', user.email,
  ], done)
}
