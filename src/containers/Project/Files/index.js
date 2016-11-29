/* @flow */

import React, { Component, PropTypes } from 'react'
import { FileList, BranchSelect, ReduxBreadcrumb, Filter } from 'components'
import urljoin from 'url-join'
import _ from 'lodash'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  BREADCRUMB_PUSH_LINK,
  BREADCRUMB_CLEAN,
  BREADCRUMB_UPDATE,
} from 'ducks/breadcrumb'

import { Sticky, StickyContainer } from 'react-sticky'
import { projectFilesTestData, changesets } from '../../../api/testData'


class Files extends Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
    this.findChild = this.findChild.bind(this)
    this.updateCurrentNode = this.updateCurrentNode.bind(this)
    this.state = { currentNode: this.props.data }
  }

  componentDidMount() {
    if (this.props.pathname.endsWith('/files')) {
      this.props.dispatch({ type: BREADCRUMB_CLEAN })
    }
    this.updateCurrentNode(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname.endsWith('/files')) {
      this.props.dispatch({ type: BREADCRUMB_CLEAN })
      if (this.state) {
        this.setState({ currentNode: nextProps.data })
      } else {
        this.state = { currentNode: nextProps.data }
      }
    } else {
      this.updateCurrentNode(nextProps)
    }
  }

  updateCurrentNode(nextProps) {
    const { params: { splat }, dispatch, location: { pathname } } = nextProps
    if (splat) {
      const nestedItem = this.findChild(nextProps.data, splat.split('/'))
      if (nestedItem) {
        this.setState({ currentNode: nestedItem.children })
      }
    }

    const index = pathname.lastIndexOf('files')
    const items = pathname.slice(index).split('/').filter(Boolean)
    dispatch({
      type: BREADCRUMB_UPDATE,
      result: items.length > 1 ? items.length - 1 : 0,
    })
  }

  findChild(nodes, path) {
    if (!nodes.length || !path.length) {
      return parent
    }

    const name = path[0]
    path.shift()

    const item = _.find(nodes, { name })
    if (path.length > 0) {
      return this.findChild(item.children, path)
    }
    return item
  }

  clickHandler(item) {
    const { location: { pathname }, dispatch } = this.props

    const nestedItem = _.find(this.state.currentNode, { id: item.id })
    if (nestedItem && nestedItem.children) {
      this.setState({ currentNode: nestedItem.children })
    }
    const link = urljoin(pathname, item.name)
    const result = {
      label: item.name,
      link,
    }
    dispatch({ type: BREADCRUMB_PUSH_LINK, result })
    dispatch(push(link))
  }

  render() {
    const { params: { id } } = this.props
    return (
      <div>
        <Helmet title="Files" />
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
                <Col md={4}>
                  <div
                    style={{
                      display: 'inline-flex',
                      border: '1px solid lightgrey',
                      borderRadius: '5px',
                      padding: '7px',
                      width: '100%',
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


                <Col md={7}>
                  <div style={{ display: 'inline-flex' }}>
                    <div style={{ width: '270px', marginRight: '5px' }}>
                      <BranchSelect project={id} placeholder="Select branch ..." />
                    </div>
                    <Filter data={changesets} placeholder="Select changeset..." />
                  </div>
                </Col>
                <Col md={1}>
                  <div style={{ float: 'right' }}><a
                    className="btn"
                    style={{
                      color: 'white',
                      backgroundColor: '#3dc5a0' }} aria-label="Download"
                  >
                    <i className="fa fa-download" aria-hidden="true" />
                  </a>
                  </div>
                </Col>
              </Row>
            </div>
          </Sticky>

          <div>
            <ReduxBreadcrumb />
          </div>
          <FileList
            data={this.state.currentNode}
            onFileClick={this.clickHandler}
          />
        </StickyContainer>
      </div>
    )
  }
}

Files.propTypes = {
  pathname: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
}

export default connect(state => ({
  pathname: state.routing.locationBeforeTransitions.pathname,
  data: projectFilesTestData,
}))(Files)
