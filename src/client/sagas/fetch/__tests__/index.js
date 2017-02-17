/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/fetch'
import { get } from 'services/ono/api'
import { fetchSaga, fetchAnythingSaga, normalizeSaga } from 'sagas/fetch'
import { types } from 'ducks/entities'

const expect = require('chai').expect

describe('fetch saga', () => {
  it('success fetch ', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const variables = { arg1: '1' }
    const generator = fetchSaga(actionName, query, variables)

    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, variables))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })

  it('fetch exception', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const variables = { arg1: '1' }
    const error = { message: 'test error message' }
    const generator = fetchSaga(actionName, query, variables)

    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, variables))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(actionName, error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })
})

describe('fetch anything saga', () => {
  it('success fetch ', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const variables = { arg1: '1' }
    const operationName = 'testQuery'
    const callbackAction1 = 'CALLBACK_ACTION1'
    const callbackAction2 = 'CALLBACK_ACTION2'
    const callbackAction3 = 'CALLBACK_ACTION3'
    const callback = (data, cbvariables) => ([{
      type: callbackAction1,
      data,
      ...cbvariables,
    }, {
      type: callbackAction2,
      data,
      ...cbvariables,
    }, {
      type: callbackAction3,
      data,
      ...cbvariables,
    }])

    const action = {
      name: actionName,
      type: 'FETCH_DATA',
      query,
      variables,
      callback,
      operationName,
    }
    const generator = fetchAnythingSaga(action)

    const testResponse = { data: { repos: [{ title: 'testrepo', id: '1' }, { title: 'testrepo2', id: '2' }] } }
    const cb1 = {
      type: callbackAction1,
      data: testResponse,
      ...variables,
    }

    const cb2 = {
      type: callbackAction2,
      data: testResponse,
      ...variables,
    }

    const cb3 = {
      type: callbackAction3,
      data: testResponse,
      ...variables,
    }
    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, variables, operationName))
    expect(generator.next(testResponse).value).to.deep.equal(call(normalizeSaga, testResponse.data))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb1))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb2))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb3))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })

  it('exception fetch', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const variables = { arg1: '1' }
    const operationName = 'testQuery'
    const callbackAction1 = 'CALLBACK_ACTION1'
    const callbackAction2 = 'CALLBACK_ACTION2'
    const callbackAction3 = 'CALLBACK_ACTION3'
    const callback = (data, cbvariables) => ([{
      type: callbackAction1,
      data,
      ...cbvariables,
    }, {
      type: callbackAction2,
      data,
      ...cbvariables,
    }, {
      type: callbackAction3,
      data,
      ...cbvariables,
    }])

    const action = {
      name: actionName,
      type: 'FETCH_DATA',
      query,
      variables,
      callback,
      operationName,
    }
    const generator = fetchAnythingSaga(action)

    const testResponse = { data: { repos: [{ title: 'testrepo', id: '1' }, { title: 'testrepo2', id: '2' }] } }
    const cb1 = {
      type: callbackAction1,
      data: testResponse,
      ...variables,
    }


    const error = { message: 'test error message' }

    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, variables, operationName))
    expect(generator.next(testResponse).value).to.deep.equal(call(normalizeSaga, testResponse.data))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb1))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(actionName, error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })
})

describe('normalize saga', () => {
  it('success normalization', () => {
    const data = {
      data: {
        me: {
          id: 2,
          username: 'kate',
          email: 'kateryna@unity3d.com',
          pullRequestsOwned: {
            nodes: [
              {
                id: 2,
                title: 'TEst Pull request',
              },
              {
                id: 3,
                title: 'test chamngeset pr',
              },
              {
                id: 4,
                title: 'some new pull request',
              },
              {
                id: 5,
                title: 'TEst Pull request werqwer qwerqwerqw qwerqwerqwer (v2)',
              },
            ],
          },
        },
      },
    }
    const normalized = {
      entities:
      {
        pullRequests: {
          2: {
            id: 2,
            title: 'TEst Pull request',
          }, 3: {
            id: 3,
            title: 'test chamngeset pr',
          }, 4: {
            id: 4,
            title: 'some new pull request',
          }, 5: {
            id: 5,
            title: 'TEst Pull request werqwer qwerqwerqw qwerqwerqwer (v2)',
          },
        },
        me: {
          id: 2,
          username: 'kate',
          email: 'kateryna@unity3d.com',
          pullRequestsOwned: {
            nodes: [
              2, 3, 4, 5,
            ],
          },
        },

      },
    }
    const generator = normalizeSaga(data.data)

    expect(generator.next().value).to.deep.equal(put({ type: types.SET_NORMALIZED_ENTITIES, entities: normalized.entities }))
  })

  it('success normalization of me without id', () => {
    const data = {
      data: {
        me: {
          username: 'kate',
          email: 'kateryna@unity3d.com',
          pullRequestsOwned: {
            nodes: [
              {
                id: 2,
                title: 'TEst Pull request',
              },
              {
                id: 3,
                title: 'test chamngeset pr',
              },
              {
                id: 4,
                title: 'some new pull request',
              },
              {
                id: 5,
                title: 'TEst Pull request werqwer qwerqwerqw qwerqwerqwer (v2)',
              },
            ],
          },
        },
      },
    }
    const normalized = {
      entities:
      {
        pullRequests: {
          2: {
            id: 2,
            title: 'TEst Pull request',
          }, 3: {
            id: 3,
            title: 'test chamngeset pr',
          }, 4: {
            id: 4,
            title: 'some new pull request',
          }, 5: {
            id: 5,
            title: 'TEst Pull request werqwer qwerqwerqw qwerqwerqwer (v2)',
          },
        },
        me: {
          username: 'kate',
          email: 'kateryna@unity3d.com',
          pullRequestsOwned: {
            nodes: [
              2, 3, 4, 5,
            ],
          },
        },

      },
    }
    const generator = normalizeSaga(data.data)

    expect(generator.next().value).to.deep.equal(put({ type: types.SET_NORMALIZED_ENTITIES, entities: normalized.entities }))
  })
})
