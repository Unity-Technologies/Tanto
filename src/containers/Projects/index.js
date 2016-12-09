/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import CircularProgress from 'material-ui/CircularProgress'
import { connect } from 'react-redux'
import { Sticky, StickyContainer } from 'react-sticky'
import urljoin from 'url-join'

import ProjectList from 'components/ProjectList/ProjectList'
import ErrorMessage from 'components/ErrorMessage'
import GroupList from 'components/GroupList/GroupList'
import { fetchProjects, clearProjects } from 'ducks/projects'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { helpers, groupPathFromPath } from 'routes/helpers'


export type Props = {
  isFetching: boolean,
  errors: Array<any>,
  projects: Array<any>,
  dispatch: Function,
  theme: Object,
  pathname: string,
  tree: any,
};

export class Projects extends Component {

  componentDidMount() {
    const { dispatch, pathname } = this.props
    this.projectClickHandler = this.projectClickHandler.bind(this)
    this.groupClickHandler = this.groupClickHandler.bind(this)
    this.props.dispatch(clearProjects())
    this.updateNode(dispatch, pathname)
  }

  componentWillReceiveProps(nextProp, nextState) {
    if (this.props.pathname !== nextProp.pathname) {
      this.props.dispatch(clearProjects())
      this.updateNode(this.props.dispatch, nextProp.pathname)
    }
  }

  updateNode(dispatch, pathname) {
    dispatch(fetchProjects(groupPathFromPath(pathname)))
  }

  props: Props
  groupClickHandler(value: string) {
    const { dispatch, pathname } = this.props
    const base = urljoin(pathname.split('/').slice(0, -1))
    let path
    if (value === 'Parent Group') {
      path = base
    } else {
      path = urljoin(pathname, value)
    }
    dispatch(push(path))
  }

  projectClickHandler(projectName: string) {
    const { dispatch } = this.props
    const path = helpers.buildProjectLinkNoBranch(projectName)
    dispatch(push(path))
  }

  render() {
    const { isFetching, errors, projects, groups, theme } = this.props

    const buttonStyle = {
      backgroundColor: '#1fb5ad',
      borderColor: '#1fb5ad',
      color: 'white',
    }
    return (
      <div>
        <Helmet title="Projects" />
      {!isFetching && (!projects || !projects.length) &&
       (!groups || !groups.length) && !errors.length &&
        <div style={{ textAlign: 'center', padding: '10%' }} >
          <h4>NO PROJECTS</h4>
        </div>
        }

        {isFetching && !projects.length &&
          <div style={{ textAlign: 'center', padding: '10%' }}>
            <CircularProgress size={2} />
          </div>
        }

        {(!!projects.length || !!groups.length) &&
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
            {!!groups &&
              <div>
                <GroupList
                  data={groups}
                  valueProp="id"
                  childrenProp="projects"
                  primaryTextProp="name"
                  secondaryTextProp="description"
                  clickHandler={this.groupClickHandler}
                  {...theme}
                />
              </div>
            }
            {!!projects &&
              <div>
                <ProjectList
                  data={projects}
                  valueProp="id"
                  childrenProp="projects"
                  primaryTextProp="name"
                  secondaryTextProp="description"
                  clickHandler={this.projectClickHandler}
                  updated="updated"
                  owner="owner"
                  {...theme}
                />
              </div>
            }
          </StickyContainer>
        }
        {!!errors.length &&
          <div style={{ textAlign: 'center', padding: '10%' }}>
            {errors.map(item =>
              <ErrorMessage key={item} message={item} />
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
