// TODO: enable flow

import React, { Component } from 'react'
import urljoin from 'url-join'
import _ from 'lodash'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import { FileList, BranchSelect, Filter } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import { breadcrumbItems } from 'routes/helpers'

import { projectFilesTestData, changesets } from '../../../api/testData'


export type Props = {
  pathname: string,
  data: Array<any>,
  dispatch: Function,
  location: Object,
  params: Object,
  breadcrumbItems: Array<Object>,
};

class Files extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { currentNode: this.props.data || {} }
  }

  componentDidMount() {
    this.updateCurrentNode(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname.endsWith('/files')) {
      if (this.state) {
        this.setState({ currentNode: nextProps.data })
      } else {
        this.state = { currentNode: nextProps.data }
      }
    } else {
      this.updateCurrentNode(nextProps)
    }
  }

  updateCurrentNode = (nextProps) => {
    const { params: { splat } } = nextProps
    if (splat) {
      const nestedItem = this.findChild(nextProps.data, splat.split('/'))
      if (nestedItem) {
        this.setState({ currentNode: nestedItem.children })
      }
    }
  }

  props: Props

  findChild = (nodes, path) => {
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

  clickHandler = (item) => {
    const { location: { pathname }, dispatch } = this.props

    const nestedItem = _.find(this.state.currentNode, { id: item.id })
    if (nestedItem && nestedItem.children) {
      this.setState({ currentNode: nestedItem.children })
    }
    const link = urljoin(pathname, item.name)

    dispatch(push(link))
  }

  render() {
    const { params: { id }, pathname } = this.props
    const items = breadcrumbItems(pathname)
    return (
      <div>
        <Helmet title="Files" />
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
        <Breadcrumb items={items} skip={2} />

        <FileList
          data={this.state.currentNode}
          onFileClick={this.clickHandler}
        />
      </div>
    )
  }
}

export default connect(state => ({
  pathname: state.routing.locationBeforeTransitions.pathname,
  data: projectFilesTestData,
}))(Files)
