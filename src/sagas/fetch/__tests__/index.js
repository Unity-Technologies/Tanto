import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/fetch'
import { get } from 'services/ono/api'
import fetchSaga from 'sagas/fetch'

const expect = require('chai').expect

describe('fetch saga', () => {
  it('success fetch ', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const args = { arg1: '1' }
    const generator = fetchSaga(actionName, query, args)

    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, args))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })

  it('fetch exception', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const args = { arg1: '1' }
    const error = { message: 'test error message' }
    const generator = fetchSaga(actionName, query, args)

    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, args))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(actionName, error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })
})
