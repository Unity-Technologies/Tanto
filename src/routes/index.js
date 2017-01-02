import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { types } from 'ducks/session'

import App from 'pages/App'
import Home from 'pages/Home'
import Projects from 'pages/Projects'
import PullRequests from 'pages/PullRequests'
import File from 'pages/Project/File'
import Files from 'pages/Project/Files'
import Project from 'pages/Project/Project'
import Changelog from 'pages/Project/Changelog'
import Overview from 'pages/Project/Overview'
import Changeset from 'pages/Project/Changeset'
import ProjectPullRequests from 'pages/Project/PullRequests'
import Issues from 'pages/Project/Issues'
import Statistics from 'pages/Project/Statistics'
import PullRequest from 'pages/Project/PullRequest'
import NewPullRequest from 'pages/Project/NewPullRequest'

import { app, project, pullrequest, changeset } from 'containers/SideBar/SideBarConfig'

export default (store) => {
  const onAppEnter = () => {
    app(store)
    store.dispatch({ type: types.FETCH_USER_PROFILE })
  }
  const onProjectEnter = (nextState) => {
    project(store, nextState.params.id)
  }

  const onPullRequestEnter = (nextState) => {
    pullrequest(store, nextState.params.id, nextState.params.prid)
  }

  const onChangesetEnter = (nextState) => {
    changeset(store, nextState.params.id, nextState.params.prid)
  }

  return (
    <Route path="/" component={App} >
      <Route onEnter={onAppEnter} >
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/pullrequests" component={PullRequests} />
        <Route path="/projects(/**)" component={Projects} />
      </Route>

      <Route onEnter={onProjectEnter}>
        <Route path="/project/:id" component={Project}>
          <IndexRoute component={Overview} />
          <Route path="files/(**/)*.*" component={File} />
          <Route path="files(/**)" component={Files} />
          <Route path="changelog" component={Changelog} />
          <Route path="pullrequests" component={ProjectPullRequests} />
          <Route onEnter={onPullRequestEnter}>
            <Route path="pullrequest/:prid(/:category)" component={PullRequest} />
          </Route>
          <Route onEnter={onChangesetEnter}>
            <Route path="changeset/:hash" component={Changeset} />
          </Route>
          <Route path="issues" component={Issues} />
          <Route path="newpullrequest" component={NewPullRequest} />
          <Route path="statistics" component={Statistics} />
        </Route>
      </Route>
    </Route>
  )
}
