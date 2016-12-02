import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../ducks'
import rootSaga from '../sagas'

/**
 * Configure Redux store, works for production and development environment.
 * For development environment adds logger middleware and DevTools. Make sure that
 * you do not add logger middleware for production environment.
 *
 * @param  {[type]} initialState store initial state
 * @param  {[type]} history      browser history
 * @return {[type]}
 */
const configureStore = (initialState, history) => {
  const reduxRouterMiddleware = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [reduxRouterMiddleware, sagaMiddleware]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // eslint-disable-line
  const finalCreateStore = composeEnhancers(applyMiddleware(...middleware))(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../ducks', () =>
      store.replaceReducer(require('../ducks')) // eslint-disable-line global-require
    )
  }

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
