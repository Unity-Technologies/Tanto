

import chai from 'chai'
import {
  actions,
  types,
  fetchStatus,
  fetchAction,
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
        isFetching: false,
      },
    }
    const updatedState = {
      [name]: {
        error: null,
        isFetching: false,
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
        error: null,
      },
    }
    expect(fetchStatus(state, action)).to.eql({
      [name]: {
        isFetching: false,
        error: null,
      },
    })
  })
})

describe('fetchActionCreator', () => {
  it('fetchActionCreator should convert any action to FETCH_DATA action', () => {
    const type = 'SOME_ACTOIN_TYPE'
    const query = 'query {test query}'
    const variables = { id: 'testid', limit: 123 }
    const operationName = 'someOperationName'
    const callback = (data: Object, cbvariables: Object) => 'some callback here'
    expect(fetchActionCreator(type, query, variables, operationName, callback))
      .to.eql({
        type: types.FETCH_DATA,
        name: type,
        operationName,
        query,
        variables,
        callback,
      })
  })
})

describe('fetchAction', () => {
  it('fetchAction should convert any action to FETCH_DATA action', () => {
    const type = 'SOME_ACTOIN_TYPE'
    const query = 'query {test query}'
    const variables = { id: 'testid', limit: 123 }
    const operationName = 'someOperationName'
    const action = {
      type,
      query,
      variables,
      operationName,
    }
    expect(fetchAction(action))
      .to.eql({
        ...action,
        name: type,
        type: types.FETCH_DATA,
      })
  })
})
