/* @flow */

import SocketIo from 'socket.io'
import env from '../config'
import kafkaClient from '../utils/kafkaClient'
import Console from '../utils/Console'

// TODO: remove kafka client initialization from here, make this configurable - disable/enable
const kafkaConsumer = kafkaClient()

export default (server) => {
  const io = new SocketIo(server)
  io.path('/ws')

  // Socket namespace for this application node server
  const namespace = env.APP_NAME.toLowerCase()
  const socketAppNamespace = io.of(`/${namespace}`)

  socketAppNamespace.on('connection', (socket) => {
    Console.log(`Socket: someone connected to '${namespace}' namespace`)

    socket.on('room', (room) => {
      Console.log(`Socket joined room '${room}'`)
      socket.join(room)
    })
  })

  if (kafkaConsumer) {
    kafkaConsumer.on('message', (message) => {
      Console.log(`kafka:${message.value}`)
      socketAppNamespace.in('kafka').emit('message', {
        message: message.value,
        date: new Date(),
      })
    })
  }

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      Console.log('disconnected')
    })

    socket.on('error', () => {
      Console.log('error')
    })
  })
  return io
}
