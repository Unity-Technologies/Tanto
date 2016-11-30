/* @flow */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import {
  App,
  Home,
  Projects,
  PullRequests,
} from 'containers'
import { actions } from 'ducks/session'
import {
  File,
  Files,
  Project,
  Changelog,
  Overview,
  Changeset,
  PullRequests as ProjectPullRequests,
  Issues,
  Statistics,
  PullRequest,
  NewPullRequest,
} from 'containers/Project'

import { app, project, pullrequest, changeset } from './components/SideBarConfig/SideBarConfig'

export const helpers = {
  buildPullRequestLink:
    (projectName: string, id: string): string => (`/${projectName}/pullrequests/${id}`),
  buildProjectLink:
    (projectName: string, branch:string): string => (`/${projectName}?branch=${branch}`),
}

export default (store: Object): Object => {
  const onAppEnter = () => {
    app(store)
    store.dispatch(actions.fetchProfile())
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
        <Route path="/projects" component={Projects} />
      </Route>

      <Route onEnter={onProjectEnter}>
        <Route path="/project/:id" component={Project}>
          <IndexRoute component={Overview} />
          <Route path="files/(**/)*.*" component={File} />
          <Route path="files(/**)" component={Files} />
          <Route path="changelog" component={Changelog} />
          <Route path="pullrequests" component={ProjectPullRequests} />
          <Route onEnter={onPullRequestEnter}>
            <Route path="pullrequest/:prid" component={PullRequest} />
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
