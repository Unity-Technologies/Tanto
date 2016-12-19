/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import ProjectList from 'components/ProjectList/ProjectList'
import ErrorMessage from 'components/ErrorMessage'
import GroupList from 'components/GroupList/GroupList'
import LinearProgress from 'material-ui/LinearProgress'
import { fetchRepositories } from 'ducks/repositories'
import type { GroupType, ProjectType, StateType } from 'ducks/projects'
import { helpers, groupPathFromPath } from 'routes/helpers'
import { repositories, groups as groupsSelector } from 'ducks/repositories/selectors'
import Breadcrumb from 'components/Breadcrumb'

export type Props = {
  isFetching: boolean,
  errors: Array<any>,
  projects: Array<ProjectType>,
  groups: Array<GroupType>,
  dispatch: Function,
  theme: Object,
  pathname: string,
  breadcrumbItems: Array<Object>
}

export class Projects extends Component {
  componentDidMount() {
    const { dispatch, pathname } = this.props
    this.updateNode(dispatch, pathname)
    dispatch(fetchRepositories(groupPathFromPath(pathname)))
  }

  componentWillReceiveProps(nextProp: any, nextState?: StateType) {
    if (this.props.pathname !== nextProp.pathname) {
      this.updateNode(this.props.dispatch, nextProp.pathname)
    }
  }

  updateNode = (dispatch: Function, pathname: string) => {
    dispatch(fetchRepositories(groupPathFromPath(pathname)))
  }

  props: Props

  groupClickHandler = (groupName: string) => {
    const path = helpers.buildProjectsLink(groupName)
    this.props.dispatch(push(path))
  }

  breadcrumbItems = () => {
    const items = this.props.pathname.split('/').filter(entry => entry.trim() !== '')
    let path = ''
    return items.map(x => {
      path = path.concat('/', x)
      return { link: path, label: x }
    })
  }

  projectClickHandler = (projectName: string) => {
    const { dispatch } = this.props
    const path = helpers.buildProjectLinkNoBranch(projectName)
    dispatch(push(path))
  }

  render() {
    const { isFetching, error, projects, theme, groups } = this.props
    const breadcrumbItems = this.breadcrumbItems()

    return (
      <div>
        <Helmet title="Projects" />
        <Breadcrumb items={breadcrumbItems} />
        {isFetching && <LinearProgress />}
        {error && <ErrorMessage text={error} />}
        <GroupList
          groups={groups}
          valueProp="id"
          childrenProp="projects"
          primaryTextProp="name"
          secondaryTextProp="description"
          clickHandler={this.groupClickHandler}
          {...theme}
        />
        <ProjectList
          projects={projects}
          valueProp="id"
          childrenProp="projects"
          primaryTextProp="name"
          secondaryTextProp="description"
          clickHandler={this.projectClickHandler}
          updated="updated"
          owner="owner"
          {...theme}
        />
      {!isFetching && !projects.length &&
       !groups.length && !error &&
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
    isFetching: state.repositories.isFetching,
    error: state.repositories.error ? state.repositories.error.message : null,
    projects: repositories(state, props),
    groups: groupsSelector(state, props),
  })
)(Projects)
