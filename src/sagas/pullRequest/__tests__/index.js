/* @flow */
import { call, put } from 'redux-saga/effects'

import { actions } from 'ducks/pullRequest'
import PULL_REQUEST_QUERY from 'services/ono/queries/pullRequest'
import { get } from 'services/ono/api'
import fetchPullRequest from '../index'

const expect = require('chai').expect

const pullRequestResponse = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    fullName: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: [
    {
      status: null,
      user: {
        fullName: 'Sharron Bronson',
        username: 'sharron',
      },
    },
  ],
  files: [],
}

const pullRequestResponseParsed = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    fullName: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: [{
    status: null,
    user: {
      fullName: 'Sharron Bronson',
      username: 'sharron',
    },
  }],
  files: [],
}


describe('fetchPullRequest saga', () => {
  it('fetches', () => {
    const generator = fetchPullRequest({ type: 'foo', id: 10 })
    const queryResponse = { data: { pullRequest: pullRequestResponse } }

    expect(generator.next().value)
      .to.deep.equal(put(actions.fetchStatus(true)))
    expect(generator.next().value)
      .to.deep.equal(call(get, PULL_REQUEST_QUERY, { id: 10 }))
    expect(generator.next(queryResponse).value)
      .to.deep.equal(put(actions.fetchDone(pullRequestResponseParsed)))
    expect(generator.next().value)
        .to.deep.equal(put(actions.fetchStatus(false)))
  })

  it('catches exception', () => {
    const generator = fetchPullRequest({ type: 'foo', id: 11 })
    const error = 'TEST ERROR fetchUserProfile'

    expect(generator.next().value)
      .to.deep.equal(put(actions.fetchStatus(true)))
    expect(generator.next().value)
      .to.deep.equal(call(get, PULL_REQUEST_QUERY, { id: 11 }))
    expect(generator.throw(error).value)
      .to.deep.equal(put(actions.fetchError(error)))
    expect(generator.next().value)
      .to.deep.equal(put(actions.fetchStatus(false)))
  })
})
