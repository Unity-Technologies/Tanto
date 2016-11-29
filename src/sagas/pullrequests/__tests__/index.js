/* eslint-disable max-len */

import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/pullrequests'
import { get } from 'services/ono/api'
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

    const pullrequests = [{ id: 1, title: '1' }, { id: 2, title: '2' }]
    const testResponse = { data: { me: { prs: pullrequests } } }
    const parser = response => (response.data.me.prs)
    const updateSession = prs => (prs)
    const generator = fetchPullRequests(query, parser, updateSession)

    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, query))
    expect(generator.next(testResponse).value).to.deep.equal(put(actions.setPullRequests(pullrequests)))
    expect(generator.next(pullrequests).value).to.deep.equal(put(updateSession(pullrequests.map(x => x.id))))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(false)))
  })

  it('fetchPullRequests should catches users fetch pull requests exception', () => {
    const query = 'test query'
    const parser = response => (response.data.me.prs)
    const updateSession = prs => (prs)
    const error = 'TEST ERROR fetchUserProfile'
    const generator = fetchPullRequests(query, parser, updateSession)

    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, query))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(false)))
  })


  it('fetchCurrentUserPullRequests should fetch current users pull requests', () => {
    const generator = fetchCurrentUserPullRequests()
    expect(generator.next().value).to.deep.equal(
        call(fetchPullRequests,
            queries.CURRENT_USER_PULL_REQUESTS,
            parsers.parseCurrentUserPullRequests,
            sessionActions.setUserPRIds))
  })

  it('fetchCurrentUserPullRequests should fetch current users assigned pull requests', () => {
    const generator = fetchCurrentUserAssignedPullRequests()
    expect(generator.next().value).to.deep.equal(
        call(fetchPullRequests,
            queries.CURRENT_USER_ASSIGNED_PULL_REQUESTS,
            parsers.parseCurrentUserAssignedPullRequests,
            sessionActions.setUserAssignedPRIds))
  })

  it('fetchCurrentUserPullRequests should fetch current users watching pull requests', () => {
    const generator = fetchCurrentUserWatchingPullRequests()
    expect(generator.next().value).to.deep.equal(
        call(fetchPullRequests,
            queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
            parsers.parseCurrentUserWatchingPullRequests,
            sessionActions.setUserWatchingPRsIds))
  })
})
