/* eslint-disable no-console */
const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => {
  console.log(`Error ${err}`)
})

exports.findById = (id, done) => {
  client.hgetall(id, done)
}

exports.save = (user, done) => {
  client.hmset(user.id, [
    'name', user.name,
    'token', user.token,
    'id', user.id,
    'username', user.username,
    'email', user.email,
  ], done)
}
