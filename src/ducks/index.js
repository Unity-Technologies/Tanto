/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import breadcrumb from './breadcrumb'
import projects from './projects'
import pullRequest from './pullRequest'
import pullrequests from './pullrequests'
import session from './session'
import sidebar from './sidebar'

export default combineReducers({
  breadcrumb,
  form: formReducer,
  projects,
  pullRequest,
  pullrequests,
  routing: routerReducer,
  session,
  sidebar,
})
