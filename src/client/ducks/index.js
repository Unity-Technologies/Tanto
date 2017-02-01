/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import repositories from './repositories'
import pullrequests, { pullRequests } from './pullrequests'
import { pullRequestsOwned, pullRequestsAssigned, profile } from './session'
import fetchStatus from './fetch'
import sidebar from './sidebar'
import users from './users'
import { entities } from './entities'

export default combineReducers({
  entities,
  pullrequests,
  routing: routerReducer,
  sidebar,
  repositories,
  fetch: fetchStatus,
  users,
  session: combineReducers({
    profile,
    pullRequests,
    pullRequestsOwned,
    pullRequestsAssigned,
  }),
})
