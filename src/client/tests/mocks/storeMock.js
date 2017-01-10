/* @flow */

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'ducks'
import rootSaga from 'sagas'

import chai from 'chai'

import { types as fetchTypes } from 'ducks/fetch'

const expect = chai.expect

export const storeMock =
  (initialState: Object, expectedActions: Array<Object>, done: Function, middleware: Array<Object> = []): Object => {
    let actions = []
    let errorCatched = false
    let i = 0

    const actionLogger = st => next => action => {
      actions.push(action)

      try {
        if (action.type === fetchTypes.FETCH_DATA) {
          expect(action).to.containSubset(expectedActions[i])
        } else {
          expect(action).to.eql(expectedActions[i])
        }
      } catch (err) {
        done(err)
        errorCatched = true
      }
      if (!errorCatched && i === expectedActions.length - 1) {
        done()
      }
      i++
      return next(action)
    }

    const sagaMiddleware = createSagaMiddleware()

    const mockMiddleware = [sagaMiddleware, actionLogger, ...middleware]

    const finalCreateStore = compose(applyMiddleware(...mockMiddleware))(createStore)

    const store = finalCreateStore(rootReducer, initialState)

    sagaMiddleware.run(rootSaga)

    store.getActions = () => actions
    store.cleanActions = () => (actions = [])

    return store
  }

export default storeMock
