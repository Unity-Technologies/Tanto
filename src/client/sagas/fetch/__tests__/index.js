/* eslint-disable  */
import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/fetch'
import { get } from 'services/ono/api'
import {
  fetchSaga, fetchAnythingSaga,
  normalizeSaga,
  transformMutationResponse,
  isMutationQuery,
} from 'sagas/fetch'
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
    expect(generator.next(testResponse).value).to.deep.equal(call(normalizeSaga, testResponse, action))
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
    expect(generator.next(testResponse).value).to.deep.equal(call(normalizeSaga, testResponse, action))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb1))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(actionName, error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })
})

describe('normalize saga', () => {
  it('success normalization of query data', () => {
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

    expect(generator.next().value).to.deep.equal(put({ type: types.SET_QUERIED_ENTITIES, entities: normalized.entities }))
  })

  it('success normalization of mutated data', () => {
    const data = {
      data: {
        createComment: {
          ok: true,
          comment: {
            id: 156,
            text: 'New comment',
          },
          pullRequest: {
            id: 3,
            title: 'test chamngeset pr',
            comments: [
              {
                id: 151,
                text: 'comment 1',
              },
              {
                id: 156,
                text: 'New comment',
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
          3: {
            id: 3,
            title: 'test chamngeset pr',
            comments: [151, 156],
          },
        },

        comments: {
          151: {
            id: 151,
            text: 'comment 1',
          },
          156: {
            id: 156,
            text: 'New comment',
          },
        },
      },
    }

    const action = {
      query: 'mutation { ...',
    }
    const generator = normalizeSaga(data, action)

    expect(generator.next().value).to.deep.equal(put({ type: types.SET_MUTATED_ENTITIES, entities: normalized.entities }))
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

    expect(generator.next().value).to.deep.equal(put({ type: types.SET_QUERIED_ENTITIES, entities: normalized.entities }))
  })

  it('null data ', () => {
    const generator = normalizeSaga(null)

    expect(generator.next().value).to.deep.equal(undefined)
  })

  it('undefined data ', () => {
    const generator = normalizeSaga(undefined)

    expect(generator.next().value).to.deep.equal(undefined)
  })
})

describe('transformMutationResponse', () => {
  it('should translform response of mutation', () => {
    const data = {
      data: {
        createComment: {
          ok: true,
          comment: {
            id: 156,
            text: 'New comment',
          },
          pullRequest: {
            id: 3,
            title: 'test chamngeset pr',
            comments: [
              {
                id: 151,
                text: 'comment 1',
              },
              {
                id: 156,
                text: 'New comment',
              },
            ],
          },
        },
      },
    }

    const expected = {

      comment: {
        id: 156,
        text: 'New comment',
      },
      pullRequest: {
        id: 3,
        title: 'test chamngeset pr',
        comments: [
          {
            id: 151,
            text: 'comment 1',
          },
          {
            id: 156,
            text: 'New comment',
          },
        ],
      },
    }

    expect(transformMutationResponse(data)).to.eql(expected)
  })

  it('should translform response of mutation wihtout ok', () => {
    const data = {
      data: {
        createComment: {
          comment: {
            id: 156,
            text: 'New comment',
          },
          pullRequest: {
            id: 3,
            title: 'test chamngeset pr',
            comments: [
              {
                id: 151,
                text: 'comment 1',
              },
              {
                id: 156,
                text: 'New comment',
              },
            ],
          },
        },
      },
    }

    const expected = {
      comment: {
        id: 156,
        text: 'New comment',
      },
      pullRequest: {
        id: 3,
        title: 'test chamngeset pr',
        comments: [
          {
            id: 151,
            text: 'comment 1',
          },
          {
            id: 156,
            text: 'New comment',
          },
        ],
      },
    }

    expect(transformMutationResponse(data)).to.eql(expected)
  })
})

describe('isMutation', () => {
  it('query', () => {
    const query = '{ comment { id, text }}'
    expect(isMutationQuery(query)).to.be.false

    const query2 = 'query{ comment { id, text }}'
    expect(isMutationQuery(query2)).to.be.false
  })

  it('mutation', () => {
    const mutation = 'mutation{ comment() { id, text }}'
    expect(isMutationQuery(mutation)).to.be.true

    const mutation2 = '  mutation{ comment() { id, text }}'
    expect(isMutationQuery(mutation2)).to.be.true

    const mutation3 = '\nmutation{ comment() { id, text }}'
    expect(isMutationQuery(mutation3)).to.be.true
  })
})
