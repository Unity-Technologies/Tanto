import reducer, { actions, types } from '../index'

const expect = require('chai').expect

const pullRequest = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    avatar: null,
    full_name: 'Kateryna Musina',
    username: 'kateryna',
  },
}

describe('actions', () => {
  it('should handle FETCH_START', () => {
    const action = {
      type: types.FETCH_START,
      id: 10,
    }
    expect(actions.fetchStart(10)).to.eql(action)
  })

  it('should handle FETCH_ERROR', () => {
    const error = 'test error'
    const action = {
      type: types.FETCH_ERROR,
      error,
    }
    expect(actions.fetchError(error)).to.eql(action)
  })

  it('should handle FETCH_DONE', () => {
    const action = {
      type: types.FETCH_DONE,
      pullRequest,
    }
    expect(actions.fetchDone(pullRequest)).to.eql(action)
  })
})


describe('reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      error: null,
      isFetching: false,
      pullRequest: null,
    }
    expect(reducer(undefined, {})).to.eql(initialState)
  })

  it('should handle FETCH_ERROR', () => {
    const error = 'error msg'
    const expectedState = {
      error,
      isFetching: false,
      pullRequest: null,
    }
    expect(reducer({}, actions.fetchError(error))).to.eql(expectedState)
  })

  it('should handle FETCH_DONE', () => {
    const expectedState = {
      error: null,
      isFetching: false,
      pullRequest,
    }
    expect(reducer({}, actions.fetchDone(pullRequest))).to.eql(expectedState)
  })
})
