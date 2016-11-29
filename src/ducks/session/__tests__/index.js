/* @flow */
/* eslint-disable max-len */

import reducer, { actions, types, selectors, DEVELOPER_PERSONA } from '../index'

const expect = require('chai').expect

describe('actions', () => {
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
    const error = { message: 'test error' }
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
    const action = {
      type: types.SET_PRS_IDS,
      ids,
    }

    expect(actions.setUserPRIds(ids)).to.eql(action)
  })

  it('set user pull requests assigned ids', () => {
    const ids = ['1', '2', '3']
    const action = {
      type: types.SET_ASSIGNED_PRS_IDS,
      ids,
    }

    expect(actions.setUserAssignedPRIds(ids)).to.eql(action)
  })

  it('set user pull requests watching ids', () => {
    const ids = ['1', '2', '3']
    const action = {
      type: types.SET_WATCHING_PRS_IDS,
      ids,
    }

    expect(actions.setUserWatchingPRsIds(ids)).to.eql(action)
  })
})

describe('reducer', () => {
  const initialState = {
    error: null,
    isFetching: false,
    persona: DEVELOPER_PERSONA,
    pr_ids: [],
    pr_ids_assigned: [],
    pr_ids_watching: [],
    profile: {
      username: null,
      email: null,
      full_name: null,
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
    expect(reducer({}, actions.setUserPRIds(ids))).to.eql({ pr_ids: ids })
  })

  it('should handle SET_ASSIGNED_PRS_IDS', () => {
    const ids = ['1', '2', '3', '4']
    expect(reducer({}, actions.setUserAssignedPRIds(ids))).to.eql({ pr_assigned_ids: ids })
  })

  it('should handle SET_WATCHING_PRS_IDS', () => {
    const ids = ['1', '2', '3', '4']
    expect(reducer({}, actions.setUserWatchingPRsIds(ids))).to.eql({ pr_watching_ids: ids })
  })

  it('should handle REQUEST_ERROR', () => {
    const error = { message: 'test error message' }
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

describe('selectors', () => {
  const sessionState = {
    error: null,
    isFetching: false,
    persona: DEVELOPER_PERSONA,
    pr_ids: ['id2', 'id3'],
    pr_assigned_ids: ['id1', 'id4'],
    pr_watching_ids: ['id5'],
    profile: {
      username: 'testauthor1',
      email: 'test@test.ff',
      full_name: 'test test',
    },
  }

  const pr1 = { id: 'id1', title: 'PR title 1', description: 'PR description 1', author: 'testauthor2' }
  const pr2 = { id: 'id2', title: 'PR title 2', description: 'PR description 2', author: 'testauthor1' }
  const pr3 = { id: 'id3', title: 'PR title 3', description: 'PR description 3', author: 'testauthor1' }
  const pr4 = { id: 'id4', title: 'PR title 4', description: 'PR description 4', author: 'testauthor2' }
  const pr5 = { id: 'id5', title: 'PR title 5', description: 'PR description 5', author: 'testauthor2' }

  const byId = {}
  byId[pr1.id] = pr1
  byId[pr2.id] = pr2
  byId[pr3.id] = pr3
  byId[pr4.id] = pr4
  byId[pr5.id] = pr5

  const pullrequstsState = {
    byId,
  }

  const state = {
    session: sessionState,
    pullrequests: pullrequstsState,
  }

  it('get persona', () => {
    expect(selectors.getPersona(state)).to.eql(DEVELOPER_PERSONA)
  })

  it('get profile', () => {
    expect(selectors.getProfile(state)).to.eql(sessionState.profile)
  })

  it('get user pull requests', () => {
    expect(selectors.getPullRequests(state)).to.eql([pr2, pr3])
  })

  it('get user pull assigned requests', () => {
    expect(selectors.getPullRequestsAssigned(state)).to.eql([pr1, pr4])
  })

  it('get user pull watching requests', () => {
    expect(selectors.getPullRequestsWatching(state)).to.eql([pr5])
  })
})
