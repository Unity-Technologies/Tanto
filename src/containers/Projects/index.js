/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Sticky, StickyContainer } from 'react-sticky'
import urljoin from 'url-join'

import ProjectList from 'components/ProjectList/ProjectList'
import ErrorMessage from 'components/ErrorMessage'
import GroupList from 'components/GroupList/GroupList'
import { fetchProjects, clearProjects } from 'ducks/projects'
import type { GroupType, ProjectType, StateType } from 'ducks/projects'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { helpers, groupPathFromPath, isBaseProjectsPath } from 'routes/helpers'


export type Props = {
  isFetching: boolean,
  errors: Array<any>,
  projects: Array<ProjectType>,
  groups: Array<GroupType>,
  dispatch: Function,
  theme: Object,
  pathname: string,
};

const PARENT_GROUP: GroupType = { name: '', shortName: 'Parent Group', description: '' }


export class Projects extends Component {
  componentDidMount() {
    const { dispatch, pathname } = this.props
    this.props.dispatch(clearProjects())
    this.updateNode(dispatch, pathname)
  }

  componentWillReceiveProps(nextProp: any, nextState?: StateType) {
    if (this.props.pathname !== nextProp.pathname) {
      this.props.dispatch(clearProjects())
      this.updateNode(this.props.dispatch, nextProp.pathname)
    }
  }

  updateNode = (dispatch: Function, pathname: string) => {
    dispatch(fetchProjects(groupPathFromPath(pathname)))
  }

  props: Props

  groupClickHandler = (groupName: string) => {
    const { dispatch, pathname } = this.props
    let path
    if (groupName === PARENT_GROUP.name) {
      const base = urljoin(pathname.split('/').slice(0, -1))
      path = base
    } else {
      path = helpers.buildProjectsLink(groupName)
    }
    dispatch(push(path))
  }

  projectClickHandler = (projectName: string) => {
    const { dispatch } = this.props
    const path = helpers.buildProjectLinkNoBranch(projectName)
    dispatch(push(path))
  }

  render() {
    const { isFetching, errors, projects, pathname, theme } = this.props
    let groups = this.props.groups
    if (!isBaseProjectsPath(pathname)) {
      groups = [PARENT_GROUP, ...groups]
    }
    const buttonStyle = {
      backgroundColor: '#1fb5ad',
      borderColor: '#1fb5ad',
      color: 'white',
    }
    return (
      <div>
        <Helmet title="Projects" />
        <StickyContainer>
          <Sticky
            style={{
              zIndex: 1030,
              backgroundColor: '#f8f8f8',
              marginBottom: '20px',
              border: '1px solid rgb(226, 226, 226)',
              borderRadius: '4px',
            }}
          >
            <div style={{ padding: '10px' }}>
              <Row>
                <Col md={8}>
                  <div
                    style={{
                      display: 'inline-flex',
                      border: '1px solid lightgrey',
                      borderRadius: '5px',
                      padding: '7px',
                      width: '300px',
                      backgroundColor: 'white' }}
                  >
                    <span
                      style={{ pagging: '10px', color: 'grey' }}
                    >
                      <i className="fa fa-search" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      style={{
                        outline: 'none',
                        border: 'none',
                        marginLeft: '10px',
                        fontSize: '14px',
                        width: '100%' }}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <ButtonGroup style={{ float: 'right' }}>
                    <Button style={buttonStyle} />
                  </ButtonGroup>
                </Col>
              </Row>
            </div>
          </Sticky>
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
       !groups.length && !errors.length &&
        <div style={{ textAlign: 'center', padding: '10%' }} >
          <h4>NO PROJECTS</h4>
        </div>
      }
        </StickyContainer>
        {!!errors.length &&
          <div style={{ textAlign: 'center', padding: '10%' }}>
            {errors.map(item =>
              <ErrorMessage error={item} />
            )}
          </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    pathname: state.routing.locationBeforeTransitions.pathname,
    isFetching: state.projects.isFetching,
    errors: state.projects.errors || [],
    projects: state.projects.projects,
    groups: state.projects.groups,
  })
)(Projects)
