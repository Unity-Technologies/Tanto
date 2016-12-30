/* eslint-disable max-len */

import reducer, { actions, types, DEVELOPER_PERSONA } from '../index'
import { sessionEntities } from 'ducks/session'
import { receivePage } from 'ducks/pagination'
import { DIRECTION } from 'ducks/order'
import _ from 'lodash'

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
    const repo = 'testrepo'
    const branch = 'testbranch'
    const action = {
      type: types.SET_PULL_REQUESTS_OWNED,
      page,
      pageSize,
      nodes,
      total,
      branch,
      repo,
    }

    expect(actions.setPullRequestsOwned(page, nodes, total, pageSize, repo, branch)).to.eql(action)
  })

  it('set user pull requests assigned ids', () => {
    const total = 3
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const page = 1
    const pageSize = 12
    const repo = 'testrepo'
    const branch = 'testbranch'
    const action = {
      type: types.SET_PULL_REQUESTS_ASSIGNED,
      page,
      pageSize,
      nodes,
      total,
      branch,
      repo,
    }

    expect(actions.setPullRequestsAssigned(page, nodes, total, pageSize, repo, branch)).to.eql(action)
  })

  it('set user pull requests watching ids', () => {
    const total = 3
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const page = 1
    const pageSize = 12
    const repo = 'testrepo'
    const branch = 'testbranch'
    const action = {
      type: types.SET_PULL_REQUESTS_WATCHING,
      page,
      pageSize,
      nodes,
      total,
      branch,
      repo,
    }

    expect(actions.setPullRequestsWatching(page, nodes, total, pageSize, repo, branch)).to.eql(action)
  })
})

describe('session reducer', () => {
  const prState = {
    orderBy: {
      direction: DIRECTION.ASC,
      field: '',
    },
    filters: {
      branch: '',
      repo: '',
    },
    pagination: {
      total: 0,
      pages: {},
      pageSize: 0,
      currentPage: 0,
    },
  }

  const initialState = {
    pullRequestsAssigned: _.cloneDeep(prState),
    pullRequestsOwned: _.cloneDeep(prState),
    pullRequestsWatching: _.cloneDeep(prState),
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
    expect(reducer({}, action)).to.eql({ pullRequestsOwned: sessionEntities({}, receivePage(action)) })
  })

  it('should handle SET_PULL_REQUESTS_ASSIGNED', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = actions.setPullRequestsAssigned(page, nodes, total, pageSize)
    expect(reducer({}, action)).to.eql({ pullRequestsAssigned: sessionEntities({}, receivePage(action)) })
  })

  it('should handle SET_PULL_REQUESTS_WATCHING', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = actions.setPullRequestsWatching(page, nodes, total, pageSize)
    expect(reducer({}, action)).to.eql({ pullRequestsWatching: sessionEntities({}, receivePage(action)) })
  })
})
