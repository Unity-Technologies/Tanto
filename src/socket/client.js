// /* @flow */


// import io from 'socket.io-client'
// import env from '../config'
// import Console from '../utils/Console'

// export default () => {
//   // Socket for default namespace
//   const socket = io('', { path: '/ws' })
//   socket.on('news', (data) => {
//     Console.log(data)
//     socket.emit('test', { message: 'test' })
//   })

//   // Socket for App namespace
//   const appSocketClient = io(`/${env.APP_NAME.toLowerCase()}`, { path: '/ws' })

//   appSocketClient.on('connect', () => {
//     // Connect to the kafka room
//     appSocketClient.emit('room', config.socket.kafkaRoom)
//   })

//   global.socket = socket

//   global.socketApp = appSocketClient

//   return appSocketClient
// }
