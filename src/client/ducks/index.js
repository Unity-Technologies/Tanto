/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import repositories from './repositories'
import pullrequests, { pullRequestsReducer } from './pullrequests'
import session from './session'
import fetchStatus from './fetch'
import sidebar from './sidebar'
import users from './users'
import { entities } from './entities'

export default combineReducers({
  entities,
  pullrequests,
  routing: routerReducer,
  session,
  sidebar,
  repositories,
  fetch: fetchStatus,
  users,
  app: combineReducers({
    pullrequests: pullRequestsReducer,
  }),
})
