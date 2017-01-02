import { put, call } from 'redux-saga/effects'
import { setRepositoriesNames } from 'ducks/repositories'
import fetchSaga from 'sagas/fetch'
import {
  ALL_REPOSITORIES_QUERY,
} from 'services/ono/queries/repositories'

import {
  delay,
  searchRepository,
} from 'sagas/repositories'

const expect = require('chai').expect

const repo1 = {
  id: 1,
  fullName: 'title1',
}

const repo2 = {
  id: 2,
  fullName: 'title2',
}

const repo3 = {
  id: 3,
  fullName: 'title3',
}

describe('search repositories names saga', () => {
  it('searchRepository', () => {
    const action = {
      type: 'SOME_TYPE',
      first: 12,
      filter: 'titl',
    }
    const repos = [repo1, repo2, repo3]
    const testResponse = { data: { repositories: { nodes: repos } } }

    const generator = searchRepository(action)
    expect(generator.next().value)
      .to.deep.equal(call(delay, 300))
    expect(generator.next().value)
      .to.deep.equal(
        call(fetchSaga, action.type, ALL_REPOSITORIES_QUERY, { first: action.first, filter: action.filter }))
    expect(generator.next(testResponse).value).to.deep.equal(put(setRepositoriesNames(repos)))
  })
})
