/* eslint-disable max-len */

import reducer, { actions, types, DEVELOPER_PERSONA } from '../index'
import { pagination, receivePage } from 'ducks/pagination'

const expect = require('chai').expect

describe('session actions', () => {
  it('set profile', () => {
    const profile = {
      username: 'testusername',
      email: 'test@test.test',
    }
    const action = {
      type: types.SET_USER_PROFILE,
      profile,
    }
    expect(actions.setProfile(profile)).to.eql(action)
  })

  it('request error', () => {
    const error = 'test error'
    const action = {
      type: types.REQUEST_ERROR,
      error,
    }
    expect(actions.requestError(error)).to.eql(action)
  })

  it('clear error', () => {
    const action = {
      type: types.CLEAR_ERROR,
    }
    expect(actions.clearError()).to.eql(action)
  })

  it('sending request', () => {
    const action = {
      type: types.SENDING_REQUEST,
      sending: true,
    }
    expect(actions.sendingRequest(true)).to.eql(action)
  })

  it('fetch profile', () => {
    const action = {
      type: types.FETCH_USER_PROFILE,
    }
    expect(actions.fetchProfile()).to.eql(action)
  })

  it('set user pull requests owned', () => {
    const total = 3
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.SET_PULL_REQUESTS_OWNED,
      page,
      pageSize,
      nodes,
      total,
    }

    expect(actions.setPullRequestsOwned(page, nodes, total, pageSize)).to.eql(action)
  })

  it('set user pull requests assigned ids', () => {
    const total = 3
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.SET_PULL_REQUESTS_ASSIGNED,
      page,
      pageSize,
      nodes,
      total,
    }

    expect(actions.setPullRequestsAssigned(page, nodes, total, pageSize)).to.eql(action)
  })

  it('set user pull requests watching ids', () => {
    const total = 3
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.SET_PULL_REQUESTS_WATCHING,
      page,
      pageSize,
      nodes,
      total,
    }

    expect(actions.setPullRequestsWatching(page, nodes, total, pageSize)).to.eql(action)
  })
})

describe('session reducer', () => {
  const initialState = {
    error: null,
    isFetching: false,
    persona: DEVELOPER_PERSONA,
    pullRequestsAssigned: {
      total: 0,
      pages: {},
      pageSize: 0,
      currentPage: 0,
    },
    pullRequestsOwned: {
      total: 0,
      pages: {},
      pageSize: 0,
      currentPage: 0,
    },
    pullRequestsWatching: {
      total: 0,
      pages: {},
      pageSize: 0,
      currentPage: 0,
    },
    profile: {
      username: null,
      email: null,
      fullName: null,
    },
  }

  it('should return initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState)
  })

  it('should handle SET_USER_PROFILE', () => {
    const profile = {
      username: 'testusername',
      email: 'test@test.test',
    }

    expect(reducer({}, actions.setProfile(profile))).to.eql({ profile })
  })

  it('should handle SET_USER_PERSONA', () => {
    const persona = 'test persona'
    expect(reducer({}, actions.setPersona(persona))).to.eql({ persona })
  })

  it('should handle SET_PULL_REQUESTS_OWNED', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = actions.setPullRequestsOwned(page, nodes, total, pageSize)
    expect(reducer({}, action)).to.eql({ pullRequestsOwned: pagination({}, receivePage(action)) })
  })

  it('should handle SET_PULL_REQUESTS_ASSIGNED', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = actions.setPullRequestsAssigned(page, nodes, total, pageSize)
    expect(reducer({}, action)).to.eql({ pullRequestsAssigned: pagination({}, receivePage(action)) })
  })

  it('should handle SET_PULL_REQUESTS_WATCHING', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = actions.setPullRequestsWatching(page, nodes, total, pageSize)
    expect(reducer({}, action)).to.eql({ pullRequestsWatching: pagination({}, receivePage(action)) })
  })

  it('should handle REQUEST_ERROR', () => {
    const error = 'test error message'
    expect(reducer({}, actions.requestError(error))).to.eql({ error })
  })

  it('should handle SENDING_REQUEST', () => {
    expect(reducer({}, actions.sendingRequest(true))).to.eql({ isFetching: true })
    expect(reducer({ isFetching: false }, actions.sendingRequest(true))).to.eql({ isFetching: true })
    expect(reducer({ isFetching: true }, actions.sendingRequest(false))).to.eql({ isFetching: false })
  })

  it('should handle CLEAR_ERROR', () => {
    const error = { message: 'test error message' }
    expect(reducer({ error }, actions.clearError(error))).to.eql({ error: null })
  })
})
