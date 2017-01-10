/* eslint-disable max-len */
import chai from 'chai'
import fetchMock from 'fetch-mock'

import
{
  types as sessionTypes,
   fetchProfile,
} from '../index'

import { types as fetchTypes } from 'ducks/fetch'
import USER_PROFILE_QUERY from 'services/ono/queries/users'

import storeMock from '../../../tests/mocks/storeMock'

const chaiSubset = require('chai-subset')
chai.use(chaiSubset)


describe('session fetch actions', () => {
  afterEach(() => fetchMock.restore())
  it('should fetch profile', (done) => {
    const actionsList = [{
      type: fetchTypes.FETCH_DATA, query: USER_PROFILE_QUERY,
      name: sessionTypes.FETCH_USER_PROFILE, args: {},
    }, {
      type: fetchTypes.CLEAR_ERROR, name: sessionTypes.FETCH_USER_PROFILE,
    }, {
      type: fetchTypes.SENDING_REQUEST, name: sessionTypes.FETCH_USER_PROFILE, sending: true,
    }, {
      type: sessionTypes.SET_USER_PROFILE, profile: { username: '78' },
    }, {
      type: fetchTypes.SENDING_REQUEST, name: sessionTypes.FETCH_USER_PROFILE, sending: false,
    }]

    const store = storeMock({}, actionsList, done)

    fetchMock.mock('*', {
      data: { me: { username: '78' } },
    })

    store.dispatch(fetchProfile())
  })

  it('should save error to state', (done) => {
    const error = new Error('some error')
    const fetchData = {
      type: fetchTypes.FETCH_DATA,
      query: USER_PROFILE_QUERY,
      name: sessionTypes.FETCH_USER_PROFILE,
      args: {},
    }

    const clearError = {
      type: fetchTypes.CLEAR_ERROR,
      name: sessionTypes.FETCH_USER_PROFILE,
    }

    const sendingRequestTrue = {
      type: fetchTypes.SENDING_REQUEST,
      name: sessionTypes.FETCH_USER_PROFILE,
      sending: true,
    }

    const setError = {
      type: fetchTypes.REQUEST_ERROR,
      error,
      name: sessionTypes.FETCH_USER_PROFILE,
    }

    const sendingRequestFalse = {
      type: fetchTypes.SENDING_REQUEST,
      name: sessionTypes.FETCH_USER_PROFILE,
      sending: false,
    }

    const actionsList = [
      fetchData, clearError, sendingRequestTrue, setError, sendingRequestFalse,
    ]

    const store = storeMock({}, actionsList, done)

    fetchMock.mock('*', { throws: error, status: 503 })

    store.dispatch(fetchProfile())
  })
})
