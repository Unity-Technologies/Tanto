import reducer, { actions, types } from '../index'

const expect = require('chai').expect


describe('actions', () => {
  const pr1 = { id: 'id1', title: 'PR title 1', description: 'PR description 1', author: 'testauthor2' }
  const pr2 = { id: 'id2', title: 'PR title 2', description: 'PR description 2', author: 'testauthor1' }
  const pr3 = { id: 'id3', title: 'PR title 3', description: 'PR description 3', author: 'testauthor1' }

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

  it('fetch pull requests', () => {
    const action = {
      type: types.SENDING_REQUEST,
      sending: true,
    }
    expect(actions.sendingRequest(true)).to.eql(action)
  })

  it('set request', () => {
    const pullrequests = [pr1, pr2, pr3]

    const action = {
      type: types.SET_PULL_REQUESTS,
      pullrequests,
    }
    expect(actions.setPullRequests(pullrequests)).to.eql(action)
  })

  it('fetch user pull request', () => {
    expect(actions.fetchUserPullRequests()).to.eql({ type: types.FETCH_USER_PULL_REQUESTS })
  })

  it('fetch user assigned pull request', () => {
    expect(actions.fetchUserAssignedPullRequests()).to.eql({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS })
  })

  it('fetch user watching pull request', () => {
    expect(actions.fatchUserWatchingPullRequests()).to.eql({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS })
  })
})


describe('reducer', () => {
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

  it('should return initial state', () => {
    const initialState = {
      error: null,
      isFetching: false,
      byId: {},
      allIds: [],
    }
    expect(reducer(undefined, {})).to.eql(initialState)
  })

  it('should handle SET_PULL_REQUESTS', () => {
    const prs = [pr1, pr2, pr3, pr4, pr5]
    const state = {
      byId,
      allIds: prs.map(x => x.id),
    }
    expect(reducer({}, actions.setPullRequests(prs))).to.eql(state)
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
