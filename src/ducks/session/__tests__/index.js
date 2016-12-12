/* @flow */
/* eslint-disable max-len */

import reducer, { actions, types, DEVELOPER_PERSONA } from '../index'

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

  it('set user pull requests ids', () => {
    const ids = ['1', '2', '3']
    const total = 3
    const action = {
      type: types.SET_PRS_IDS,
      ids,
      total,
    }

    expect(actions.setUserPRIds(ids, total)).to.eql(action)
  })

  it('set user pull requests assigned ids', () => {
    const ids = ['1', '2', '3']
    const total = 3
    const action = {
      type: types.SET_ASSIGNED_PRS_IDS,
      ids,
      total,
    }

    expect(actions.setUserAssignedPRIds(ids, total)).to.eql(action)
  })

  it('set user pull requests watching ids', () => {
    const ids = ['1', '2', '3']
    const total = 3
    const action = {
      type: types.SET_WATCHING_PRS_IDS,
      ids,
      total,
    }

    expect(actions.setUserWatchingPRsIds(ids, total)).to.eql(action)
  })
})

describe('session reducer', () => {
  const initialState = {
    error: null,
    isFetching: false,
    persona: DEVELOPER_PERSONA,
    pullRequestsAssigned: {
      ids: [],
      total: 0,
    },
    pullRequestsOwned: {
      ids: [],
      total: 0,
    },
    pullRequestsWatching: {
      ids: [],
      total: 0,
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

  it('should handle SET_PRS_IDS', () => {
    const ids = ['1', '2', '3', '4']
    const total = 12
    expect(reducer({}, actions.setUserPRIds(ids, total))).to.eql({ pullRequestsOwned: { ids, total } })
  })

  it('should handle SET_ASSIGNED_PRS_IDS', () => {
    const ids = ['1', '2', '3', '4']
    const total = 12
    expect(reducer({}, actions.setUserAssignedPRIds(ids, total))).to.eql({ pullRequestsAssigned: { ids, total } })
  })

  it('should handle SET_WATCHING_PRS_IDS', () => {
    const ids = ['1', '2', '3', '4']
    const total = 12
    expect(reducer({}, actions.setUserWatchingPRsIds(ids, total))).to.eql({ pullRequestsWatching: { ids, total } })
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
