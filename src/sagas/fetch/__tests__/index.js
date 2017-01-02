/* eslint-disable max-len */
import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/fetch'
import { get } from 'services/ono/api'
import { fetchSaga, fetchAnythingSaga } from 'sagas/fetch'

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

describe('fetch anything saga', () => {
  it('success fetch ', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const args = { arg1: '1' }
    const callbackAction1 = 'CALLBACK_ACTION1'
    const callbackAction2 = 'CALLBACK_ACTION2'
    const callbackAction3 = 'CALLBACK_ACTION3'
    const callback = (data, cbArgs) => ([{
      type: callbackAction1,
      data,
      ...cbArgs,
    }, {
      type: callbackAction2,
      data,
      ...cbArgs,
    }, {
      type: callbackAction3,
      data,
      ...cbArgs,
    }])

    const action = {
      name: actionName,
      type: 'FETCH_DATA',
      query,
      args,
      callback,
    }
    const generator = fetchAnythingSaga(action)

    const testResponse = { data: { repos: [{ title: 'testrepo', id: '1' }, { title: 'testrepo2', id: '2' }] } }
    const cb1 = {
      type: callbackAction1,
      data: testResponse,
      ...args,
    }

    const cb2 = {
      type: callbackAction2,
      data: testResponse,
      ...args,
    }

    const cb3 = {
      type: callbackAction3,
      data: testResponse,
      ...args,
    }
    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, args))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb1))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb2))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb3))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })

  it('exception fetch', () => {
    const actionName = 'testaction'
    const query = 'test query'
    const args = { arg1: '1' }
    const callbackAction1 = 'CALLBACK_ACTION1'
    const callbackAction2 = 'CALLBACK_ACTION2'
    const callbackAction3 = 'CALLBACK_ACTION3'
    const callback = (data, cbArgs) => ([{
      type: callbackAction1,
      data,
      ...cbArgs,
    }, {
      type: callbackAction2,
      data,
      ...cbArgs,
    }, {
      type: callbackAction3,
      data,
      ...cbArgs,
    }])

    const action = {
      name: actionName,
      type: 'FETCH_DATA',
      query,
      args,
      callback,
    }
    const generator = fetchAnythingSaga(action)

    const testResponse = { data: { repos: [{ title: 'testrepo', id: '1' }, { title: 'testrepo2', id: '2' }] } }
    const cb1 = {
      type: callbackAction1,
      data: testResponse,
      ...args,
    }


    const error = { message: 'test error message' }

    expect(generator.next().value).to.deep.equal(put(actions.clearError(actionName)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, true)))
    expect(generator.next().value).to.deep.equal(call(get, query, args))
    expect(generator.next(testResponse).value).to.deep.equal(put(cb1))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(actionName, error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(actionName, false)))
  })
})
