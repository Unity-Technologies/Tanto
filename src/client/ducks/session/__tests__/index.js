/* eslint-disable max-len */

import reducer,
{ sessionEntities, repo } from '../index'
import { types, setPersona, setProfile } from '../actions'
import { receivePage } from 'ducks/pagination'
import { DIRECTION } from 'ducks/order'
import _ from 'lodash'
const expect = require('chai').expect
import { PullRequestSource, DEVELOPER_PERSONA } from 'universal/constants'


describe('session reducer', () => {
  const prState = {
    orderBy: {
      direction: DIRECTION.ASC,
      field: '',
    },
    filters: {
      target: {
        name: '',
        type: PullRequestSource.BRANCH,
      },
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
    persona: DEVELOPER_PERSONA,
  }

  it('should return initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState)
  })

  it('should handle SET_USER_PROFILE', () => {
    const profile = {
      username: 'testusername',
      email: 'test@test.test',
    }

    expect(reducer({}, setProfile(profile))).to.eql({ profile })
  })

  it('should handle SET_USER_PERSONA', () => {
    const persona = 'test persona'
    expect(reducer({}, setPersona(persona))).to.eql({ persona })
  })

  it('should handle SET_PULL_REQUESTS_OWNED', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = {
      type: types.SET_PULL_REQUESTS_OWNED, page, nodes, total, pageSize }
    expect(reducer({}, action)).to.eql({ pullRequestsOwned: sessionEntities({}, receivePage(action)) })
  })

  it('should handle SET_PULL_REQUESTS_ASSIGNED', () => {
    const total = 12
    const page = 3
    const pageSize = 12
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = {
      type: types.SET_PULL_REQUESTS_ASSIGNED, page, nodes, total, pageSize,
    }
    expect(reducer({}, action)).to.eql({ pullRequestsAssigned: sessionEntities({}, receivePage(action)) })
  })
})

describe('session filters reducers', () => {
  it('repo reducer', () => {
    const repoName = 'testrepo'
    const action = {
      type: 'ANY',
      repo: repoName,
    }
    expect(repo('', action)).to.eql(repoName)
  })
})

