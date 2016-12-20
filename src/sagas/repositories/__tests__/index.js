import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/repositories'
import { get } from 'services/ono/api'
import { actions as entitiesActions } from 'ducks/entities'

import {
  query,
} from 'services/ono/queries/repositories'

import {
  fetchRepositories,
} from 'sagas/repositories'

const expect = require('chai').expect

const repo1 = {
  id: 1,
  title: 'title1',
  description: 'description1',
}

const repo2 = {
  id: 2,
  title: 'title2',
  description: 'description2',
}

const repo3 = {
  id: 3,
  title: 'title3',
  description: 'description3',
}

const group1 = {
  id: 'group2',
  title: 'grouptitle2',
  description: 'groupdescription2',
}

const group2 = {
  id: 'group2',
  title: 'grouptitle3',
  description: 'groupdescription3',
}

describe('repositories saga', () => {
  it('fetchRepositories should fetch the nested level projects', () => {
    const name = 'group1'
    const action = {
      name,
    }
    const repos = [repo1, repo2, repo3]
    const groups = [group1, group2]
    const testResponse = { data: { repositories: { nodes: repos }, groups } }

    const generator = fetchRepositories(action)
    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, query(name), { name }))
    expect(generator.next(testResponse).value).to.deep.equal(put(actions.setRepositories(repos)))
    expect(generator.next(testResponse).value).to.deep.equal(put(actions.setGroups(groups)))

    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(false)))
  })

  it('fetchRepositories should fetch the first level projects', () => {
    const name = null
    const action = {
      name,
    }
    const repos = [repo1, repo2, repo3]
    const groups = [group1, group2]
    const testResponse = { data: { group: { repositories: { nodes: repos }, groups } } }

    const generator = fetchRepositories(action)
    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, query(name), null))
    expect(generator.next(testResponse).value).to.deep.equal(put(actions.setRepositories(repos)))
    expect(generator.next(testResponse).value).to.deep.equal(put(actions.setGroups(groups)))

    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(false)))
  })

  it('fetchRepositories should catch an error', () => {
    const name = null
    const action = {
      name,
    }

    const error = 'Test error'

    const generator = fetchRepositories(action)
    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(true)))
    expect(generator.throw(error).value).to.deep.equal(put(entitiesActions.requestError(error)))

    expect(generator.next().value).to.deep.equal(put(entitiesActions.sendingRequest(false)))
  })
})
