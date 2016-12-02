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
    avatar: null,
    full_name: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: {
    edges: [
      {
        node: {
          review_status: null,
          user: {
            avatar: null,
            full_name: 'Sharron Bronson',
            username: 'sharron',
          },
        },
      },
    ],
  },
}

const pullRequestResponseParsed = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    avatar: null,
    full_name: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: [{
    review_status: null,
    user: {
      avatar: null,
      full_name: 'Sharron Bronson',
      username: 'sharron',
    },
  }],
}


describe('fetchPullRequest saga', () => {
  it('fetches', () => {
    const generator = fetchPullRequest({ type: 'foo', id: 10 })
    const queryResponse = { data: { pull_request: pullRequestResponse } }

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
