/* eslint-disable max-len */

import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/pullrequests'
import { get } from 'services/ono/api'
import { actions as entitiesActions } from 'ducks/entities'
import { actions as sessionActions } from 'ducks/session'
import {
  queries,
  parsers,
} from 'services/ono/queries/pullrequests'

import {
    fetchPullRequests,
    fetchCurrentUserPullRequests,
    fetchCurrentUserAssignedPullRequests,
    fetchCurrentUserWatchingPullRequests } from 'sagas/pullrequests'

const expect = require('chai').expect

describe('pullrequests saga', () => {
  it('fetchPullRequests should fetch users pull requests', () => {
    const query = 'test query'
    const total = 12
    const pullrequests = [{ id: 1, title: '1' }, { id: 2, title: '2' }]
    const testResponse = { data: { me: { prs: { nodes: pullrequests, total } } } }
    const parser = response => (response.data.me.prs)
    const updateSession = prs => (prs)
    const pageSize = 12
    const page = 1
    const action = {
      pageSize,
      page,
    }
    const first = pageSize
    const offset = pageSize * (page - 1)

    const generator = fetchPullRequests(action, query, parser, updateSession)

    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, query, { first, offset }))
    expect(generator.next(testResponse).value).to.deep.equal(put(actions.setPullRequests(page, pullrequests)))
    expect(generator.next(pullrequests).value).to.deep.equal(put(updateSession(page, pullrequests, total, pageSize)))
    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(false)))
  })

  it('fetchPullRequests should catches users fetch pull requests exception', () => {
    const query = 'test query'
    const parser = response => (response.data.me.prs)
    const updateSession = prs => (prs)
    const error = 'TEST ERROR fetchUserProfile'

    const pageSize = 12
    const page = 1
    const action = {
      pageSize,
      page,
    }

    const first = pageSize
    const offset = pageSize * (page - 1)
    const generator = fetchPullRequests(action, query, parser, updateSession)
    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, query, { first, offset }))
    expect(generator.throw(error).value).to.deep.equal(put(entitiesActions.requestError(error)))
    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(false)))
  })


  it('fetchCurrentUserPullRequests should fetch current users pull requests', () => {
    const action = {
      pageSize: 12,
      page: 2,
    }

    const generator = fetchCurrentUserPullRequests(action)
    expect(generator.next().value).to.deep.equal(
        call(fetchPullRequests,
            action,
            queries.CURRENT_USER_PULL_REQUESTS,
            parsers.parseCurrentUserPullRequests,
            sessionActions.setPullRequestsOwned))
  })

  it('fetchCurrentUserPullRequests should fetch current users assigned pull requests', () => {
    const action = {
      pageSize: 12,
      page: 2,
    }
    const generator = fetchCurrentUserAssignedPullRequests(action)
    expect(generator.next().value).to.deep.equal(
        call(fetchPullRequests,
            action,
            queries.CURRENT_USER_ASSIGNED_PULL_REQUESTS,
            parsers.parseCurrentUserAssignedPullRequests,
            sessionActions.setPullRequestsAssigned))
  })

  it('fetchCurrentUserPullRequests should fetch current users watching pull requests', () => {
    const action = {
      pageSize: 12,
      page: 2,
    }
    const generator = fetchCurrentUserWatchingPullRequests(action)
    expect(generator.next().value).to.deep.equal(
        call(fetchPullRequests,
            action,
            queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
            parsers.parseCurrentUserWatchingPullRequests,
            sessionActions.setPullRequestsWatching))
  })
})
