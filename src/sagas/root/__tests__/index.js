/* eslint-disable max-len */
import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import fetchCurrentUserProfile from 'sagas/session'
import { types as sessionTypes } from 'ducks/session'
import { types as prTypes } from 'ducks/pullrequests'
import {
  fetchCurrentUserPullRequests,
  fetchCurrentUserAssignedPullRequests,
  fetchCurrentUserWatchingPullRequests,
} from 'sagas/pullrequests'

import rootSaga from 'sagas'

const expect = require('chai').expect


describe('session sagas', () => {
  it('fetchUserProfile should fetch user profile', () => {
    const generator = rootSaga()
    expect(generator.next().value).to.deep.equal(
      fork(takeLatest, sessionTypes.FETCH_USER_PROFILE, fetchCurrentUserProfile))
    expect(generator.next().value).to.deep.equal(
      fork(takeLatest, prTypes.FETCH_USER_PULL_REQUESTS, fetchCurrentUserPullRequests))
    expect(generator.next().value).to.deep.equal(
      fork(takeLatest, prTypes.FETCH_USER_ASSIGNED_PULL_REQUESTS, fetchCurrentUserAssignedPullRequests))
    expect(generator.next().value).to.deep.equal(
      fork(takeLatest, prTypes.FETCH_USER_WATCHING_PULL_REQUESTS, fetchCurrentUserWatchingPullRequests))
  })
})
