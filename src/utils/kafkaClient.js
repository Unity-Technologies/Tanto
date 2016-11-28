/* @flow */


import kafka from 'kafka-node'
import Console from './Console'

/**
 * Returns kafka consumer instance
 * @return {HighLevelConsumer} [description]
 */
export default () => {
  const HighLevelConsumer = kafka.HighLevelConsumer
  const client = new kafka.Client('localhost:2181')
  let connected = true

  // TODO: create separate kafka config and more sofistication error handling
  // with coinnection resume settings
  client.on('error', () => {
    Console.log('Kafka client error')
    connected = false
  })

  if (!connected) {
    client.close()
    return null
  }

  const consumer = new HighLevelConsumer(
    client, [
      { topic: 'test' },
    ]
  )

  consumer.on('error', () => {
    Console.log('Kafka consumer error')
    connected = false
  })

  if (!connected) {
    consumer.close()
    return null
  }

  return consumer
}
