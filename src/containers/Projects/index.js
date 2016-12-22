/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import ErrorMessage from 'components/ErrorMessage'
import LinearProgress from 'material-ui/LinearProgress'
import { fetchRepositories } from 'ducks/repositories'
import type { StateType } from 'ducks/repositories'
import { groupPathFromPath } from 'routes/helpers'
import {
  repositories as repositoriesSelector,
  groups as groupsSelector,
  error as errorSelector,
  isFetching as isFetchingSelector } from 'ducks/repositories/selectors'
import Breadcrumb from 'components/Breadcrumb'
import RepositoryList from 'components/RepositoryList'
import type { RepositoryType, GroupType } from 'components/RepositoryList'

export type Props = {
  isFetching: boolean,
  error: Object,
  projects: Array<RepositoryType>,
  groups: Array<GroupType>,
  dispatch: Function,
  theme: Object,
  style: Object,
  pathname: string,
  breadcrumbItems: Array<Object>
}

export class Projects extends Component {
  componentWillMount() {
    const { dispatch, pathname } = this.props
    dispatch(fetchRepositories(groupPathFromPath(pathname)))
  }

  componentWillReceiveProps(nextProp: any, nextState?: StateType) {
    if (this.props.pathname !== nextProp.pathname) {
      this.props.dispatch(fetchRepositories(groupPathFromPath(nextProp.pathname)))
    }
  }

  props: Props

  render() {
    const { isFetching, error, projects, groups, pathname } = this.props

    return (
      <div>
        <Helmet title="Projects" />
        <Breadcrumb path={pathname} skip={0} />
        {isFetching && <LinearProgress />}
        {error && <ErrorMessage error={error} />}
        <RepositoryList groups={groups} repositories={projects} path={pathname} />
        {!isFetching && !projects.length && !groups.length && !error &&
          <div style={{ textAlign: 'center', padding: '10%' }} >
            <h4>NO PROJECTS</h4>
          </div>
        }
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    pathname: state.routing.locationBeforeTransitions.pathname,
    isFetching: isFetchingSelector(state),
    error: errorSelector(state),
    projects: repositoriesSelector(state, props),
    groups: groupsSelector(state, props),
  })
)(Projects)
