/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import repositories from './repositories'
import pullRequest from './pullRequest'
import pullrequests from './pullrequests'
import session from './session'
import sidebar from './sidebar'

export default combineReducers({
  form: formReducer,
  pullRequest,
  pullrequests,
  routing: routerReducer,
  session,
  sidebar,
  repositories,
})
