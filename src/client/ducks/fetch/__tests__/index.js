import chai from 'chai'
import {
  actions,
  types,
  fetchStatus,
  fetchSelector,
  isFetchingSelector,
  errorSelector,
  fetchActionCreator,
} from '../index'

const expect = chai.expect

describe('fetch actions', () => {
  it('request error', () => {
    const errorMessage = 'test error'
    const name = 'somename'
    const action = {
      type: types.REQUEST_ERROR,
      error: errorMessage,
      name,
    }
    expect(actions.requestError(name, errorMessage)).to.eql(action)
  })

  it('clear error', () => {
    const name = 'somename'
    const action = {
      type: types.CLEAR_ERROR,
      name,
    }
    expect(actions.clearError(name)).to.eql(action)
  })

  it('sending request', () => {
    const name = 'somename'
    const action = {
      type: types.SENDING_REQUEST,
      sending: true,
      name,
    }
    expect(actions.sendingRequest(name, true)).to.eql(action)
  })
})

describe('fetch error reducer', () => {
  it('should handle REQUEST_ERROR', () => {
    const name = 'somename'
    const errorMessage = { message: 'test error' }
    const action = actions.requestError(name, errorMessage)
    expect(fetchStatus({}, action)).to.eql({
      [name]: {
        error: errorMessage,
      },
    })
  })

  it('should handle CLEAR_ERROR', () => {
    const name = 'somename'
    const action = actions.clearError(name)
    const state = {
      [name]: {
        error: { message: 'test error' },
      },
    }
    const updatedState = {
      [name]: {
        error: null,
      },
    }
    expect(fetchStatus(state, action)).to.eql(updatedState)
  })

  it('should handle SENDING_REQUEST - true', () => {
    const name = 'somename'
    const action = actions.sendingRequest(name, true)
    expect(fetchStatus({}, action)).to.eql({
      [name]: {
        isFetching: true,
      },
    })
  })

  it('should handle SENDING_REQUEST - false', () => {
    const name = 'somename'
    const action = actions.sendingRequest(name, false)
    const state = {
      [name]: {
        isFetching: true,
      },
    }
    expect(fetchStatus(state, action)).to.eql({
      [name]: {
        isFetching: false,
      },
    })
  })
})

describe('fetch selectors', () => {
  it('fetchSelector returns existing property', () => {
    const key = 'testkey'
    const prop = 'somevalue'
    const value = 'somevalue'
    const state = { fetch: { [key]: { [prop]: value } } }
    expect(fetchSelector(key, prop)(state)).to.eql(value)
  })

  it('fetchSelector returns null if property absent', () => {
    const key = 'testkey'
    const prop = 'somevalue'

    const state = { fetch: { } }
    expect(fetchSelector(key, prop)(state)).to.eql(null)
  })

  it('fetchSelector returns default value if property absent', () => {
    const key = 'testkey'
    const prop = 'somevalue'
    const defaultValue = 'defaultValue'
    const state = { fetch: {} }
    expect(fetchSelector(key, prop, defaultValue)(state)).to.eql(defaultValue)
  })

  it('isFetchingSelector returns existing property', () => {
    const key = 'testkey'
    const state = { fetch: { [key]: { isFetching: true } } }
    expect(isFetchingSelector(key)(state)).to.eql(true)
  })

  it('isFetchingSelector returns false if no property', () => {
    const key = 'testkey'
    const state = { fetch: { } }
    expect(isFetchingSelector(key)(state)).to.eql(false)
  })

  it('errorSelector returns null if no property', () => {
    const key = 'testkey'
    const state = { fetch: {} }
    expect(errorSelector(key)(state)).to.eql(null)
  })

  it('errorSelector returns property', () => {
    const key = 'testkey'
    const error = { message: 'some error' }
    const state = { fetch: { [key]: { error } } }
    expect(errorSelector(key)(state)).to.eql(error)
  })
})

describe('fetchActionCreator', () => {
  it('fetchActionCreator should convert any action to FETCH_DATA action', () => {
    const type = 'SOME_ACTOIN_TYPE'
    const query = 'query {test query}'
    const args = { id: 'testid', first: 123 }
    const callback = (data: Object, cbArgs: Object) => 'some callback here'
    expect(fetchActionCreator(type, query, args, callback))
      .to.eql({
        type: types.FETCH_DATA,
        name: type,
        query,
        args,
        callback,
      })
  })
})
