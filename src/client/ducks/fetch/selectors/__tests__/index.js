import chai from 'chai'
import {
  fetchSelector,
  statusFetchFactory,
} from '../index'

const expect = chai.expect

describe('fetch selectors', () => {
  it('fetch selector return fetch state', () => {
    const key = 'testkey'
    const prop = 'somevalue'
    const value = 'somevalue'
    const state = { fetch: { [key]: { [prop]: value } } }
    expect(fetchSelector(state)).to.eql(state.fetch)
  })

  it('statusFetchFactory returns existing status for key', () => {
    const key = 'testkey'
    const error = { message: 'somevalue' }
    const status = { isFetching: false, error }
    const state = { fetch: { [key]: status } }
    const fetchStatus = statusFetchFactory(key)
    expect(fetchStatus(state)).to.eql(status)
  })

  it('statusFetchFactory returns null if key absents', () => {
    const key = 'testkey'
    const state = { fetch: {} }
    const fetchStatus = statusFetchFactory(key)
    expect(fetchStatus(state)).to.eql({ isFetching: false, error: null })
  })
})
