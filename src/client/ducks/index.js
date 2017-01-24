/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import repositories from './repositories'
import pullrequests from './pullrequests'
import session from './session'
import fetchStatus from './fetch'
import sidebar from './sidebar'
import users from './users'

export default combineReducers({
  pullrequests,
  routing: routerReducer,
  session,
  sidebar,
  repositories,
  fetch: fetchStatus,
  users,
})
