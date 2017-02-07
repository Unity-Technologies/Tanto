/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import pullRequests from './pullrequests'
import { pullRequestsOwned, pullRequestsAssigned, profile } from './session'
import fetchStatus from './fetch'
import sidebar from './sidebar'

import { entities } from './entities'

export default combineReducers({
  entities,
  routing: routerReducer,
  sidebar,
  fetch: fetchStatus,
  session: combineReducers({
    profile,
    pullRequests,
    pullRequestsOwned,
    pullRequestsAssigned,
  }),
})
