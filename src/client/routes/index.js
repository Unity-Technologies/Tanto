import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'

import { fetchProfile } from 'ducks/session/actions'
import { fetchUsers } from 'ducks/users'

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
import PullRequest from 'pages/Project/PullRequest'
import NewPullRequest from 'pages/Project/NewPullRequest'
import { fetchRepository } from 'ducks/repositories/actions'


import {
  fetchPullRequestFilesList,
  fetchPullRequestFiles,
  fetchPullRequestMetadata,
  fetchPullRequestDiscussion,
  fetchPullRequestIssues,
  fetchPullRequestChangeset,
  fetchPullRequestReviews,
} from 'ducks/pullrequests/actions'

import { app, project, pullrequest, changeset } from 'containers/SideBar/SideBarConfig'

export const initialPrefetch = (store) => {
  store.dispatch(fetchProfile())
  store.dispatch(fetchUsers())
}

export default (store) => {
  initialPrefetch(store)

  const onAppEnter = () => {
    app(store)
  }
  const onProjectEnter = (nextState) => {
    const name = nextState.params.splat
    project(store, name)
    if (name) {
      store.dispatch(fetchRepository(name))
    }
  }

  const onPullRequestEnter = (nextState) => {
    const id = nextState.params.prid
    pullrequest(store, nextState.params.splat, id)
    store.dispatch(fetchPullRequestMetadata(id))
    store.dispatch(fetchPullRequestDiscussion(id))
    store.dispatch(fetchPullRequestFilesList(id))
    store.dispatch(fetchPullRequestFiles(id))
    store.dispatch(fetchPullRequestIssues(id))
    store.dispatch(fetchPullRequestChangeset(id))
    store.dispatch(fetchPullRequestReviews(id))
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
        <Route path="/project" component={Project}>
          <IndexRoute component={Overview} />
          <Route path="**/files/(**/)*.*" component={File} />
          <Route path="**/files(/**)" component={Files} />
          <Route path="**/changelog" component={Changelog} />
          <Route path="**/pullrequests" component={ProjectPullRequests} />

          <Route onEnter={onPullRequestEnter}>
            <Route path="**/pullrequest/:prid(/:category)" component={PullRequest} />
          </Route>
          <Route onEnter={onChangesetEnter}>
            <Route path="**/changeset/:hash" component={Changeset} />
          </Route>
          <Route path="**/issues" component={Issues} />
          <Route path="**/newpullrequest" component={NewPullRequest} />
          <Route path="**" component={Overview} />
        </Route>
      </Route>
    </Route>
  )
}
