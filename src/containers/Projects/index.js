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
import { fetchProjects } from 'ducks/projects'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'

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
    const { dispatch } = this.props;
    (this:any).clickHandler = this.clickHandler.bind(this)
    dispatch(fetchProjects())
  }

  props: Props

  clickHandler(value: string) {
    const { dispatch, pathname } = this.props
    let path
    if (value === '') {
      path = urljoin(pathname.split('/').slice(0, -1))
    } else {
      path = urljoin(pathname, value)
    }
    dispatch(push(path))
  }

  render() {
    const { isFetching, errors, tree, theme, dispatch, pathname } = this.props
    let groups
    let projects
    if (pathname === '/projects' || pathname === '/projects/') {
      groups = Object.keys(tree.groups).map(key => tree.groups[key])
      projects = tree.projects
    } else {
      const steps = pathname.split('/').slice(2)
      let nextGroup = tree
      for (let i = 0; i < steps.length; i += 1) {
        if (nextGroup.groups[steps[i]] == null) {
          break
        }
        nextGroup = nextGroup.groups[steps[i]]
      }

      const parent = { id: '', name: 'Parent Group' }

      groups = [parent, ...Object.keys(nextGroup.groups).map(key => nextGroup.groups[key])]
      projects = [...nextGroup.projects]
    }
    const buttonStyle = {
      backgroundColor: '#1fb5ad',
      borderColor: '#1fb5ad',
      color: 'white',
    }
    return (
      <div>
        <Helmet title="Projects" />
        {!isFetching && !projects.length && !groups.length && !errors.length &&
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
            {!!groups.length &&
              <div>
                <GroupList
                  data={groups}
                  valueProp="id"
                  childrenProp="projects"
                  primaryTextProp="name"
                  secondaryTextProp="description"
                  clickHandler={value => this.clickHandler(value)}
                  {...theme}
                />
              </div>
            }
            {!!projects.length &&
              <div>
                <ProjectList
                  data={projects}
                  valueProp="id"
                  childrenProp="projects"
                  primaryTextProp="name"
                  secondaryTextProp="description"
                  clickHandler={value => dispatch(push(`/project/${value}`))}
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
    tree: state.projects.tree || { groups: [], projects: [] },
  })
)(Projects)
