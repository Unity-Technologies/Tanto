import fetchMock from 'fetch-mock'
import { get } from 'services/ono/api'
import 'isomorphic-fetch'

const expect = require('chai').expect

describe('ono api get', () => {
  it('handles http status', () => {
    const errorMessage = 'Error 503'
    fetchMock.mock('*', { throws: new Error(errorMessage), status: 503 })

    get('query')
    .catch((error) => {
      expect(error.message).to.be.eql(errorMessage)
    })

    fetchMock.restore()
  })

  it('fetches data', () => {
    const testResponse = { data: { profile: { username: 'test' } } }
    fetchMock.post('*', testResponse)
    get('query')
    .then((data) => {
      expect(data).to.be.eql(testResponse)
    })
    fetchMock.restore()
  })
})
