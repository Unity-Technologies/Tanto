/* @flow */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import projects from './projects'
import session from './session'
import pullrequests from './pullrequests'
import sidebar from './sidebar'
import breadcrumb from './breadcrumb'

export default combineReducers({
  projects,
  sidebar,
  breadcrumb,
  session,
  pullrequests,
  form: formReducer,
  routing: routerReducer,
})
