// TODO: add flow annotations

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import CircularProgress from 'material-ui/CircularProgress'
import { ErrorMessage, ProjectList } from 'components'
import { connect } from 'react-redux'
import { fetchProjects } from 'ducks/projects'
import { Sticky, StickyContainer } from 'react-sticky'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'

export type Props = {
  isFetching: boolean,
  errors?: Array<any>,
  projects: Array<any>,
  dispatch: Function,
  theme: Object,
};

export class Projects extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    this.clickHandler = this.clickHandler.bind(this)
    // todo: remove this from constructor
    dispatch(fetchProjects())
  }

  props: Props

  clickHandler(value) {
    const { dispatch } = this.props
    dispatch(push(`/project/${value}`))
  }

  render() {
    const { isFetching, errors, projects, theme, dispatch } = this.props

    const buttonStyle = {
      backgroundColor: '#1fb5ad',
      borderColor: '#1fb5ad',
      color: 'white',
    }

    return (
      <div>
        <Helmet title="Projects" />
        {!isFetching && !projects.length && !errors.length &&
          <div style={{ textAlign: 'center', padding: '10%' }} >
            <h4>NO PROJECTS</h4>
          </div>
        }

        {isFetching && !projects.length &&
          <div style={{ textAlign: 'center', padding: '10%' }}>
            <CircularProgress size={2} />
          </div>
        }

        {!!projects.length &&
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

            <div>
              <ProjectList
                data={projects}
                valueProp="id"
                childrenProp="projects"
                primaryTextProp="name"
                secondaryTextProp="description"
                clickHandler={value => dispatch(push(`/project/${value}`))}
                {...theme}
              />
            </div>
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
    isFetching: state.projects.isFetching,
    errors: state.projects.errors || [],
    projects: state.projects.tree || [],
  })
)(Projects)
