// TODO: finish flow annotations

import React, { Component } from 'react'
import Scroll from 'react-scroll'
import _ from 'lodash'

import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'


import Select from 'react-select'
import 'react-select/dist/react-select.css'

import ChangesetFileList from '../ChangesetFileList'

import DiffHeader from './DiffHeader/DiffHeader'

import Code from './Code/Code'
import './CodeDiffView.css'

const Element = Scroll.Element

export type Props = {
  files: Array<any>,
  loggedUsername: string,
  viewType?: number,
}

class CodeDiffView extends Component {
  /* eslint-disable react/sort-comp */
  static renderValue(option) {
    return <span>{option.value}</span>
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      viewType: props.viewType || '0',
      startedComment: false,
      collapsedComments: false,
      commentLine: null,
      selectedFile: 0,
      showFileList: false,
      showCommentsList: false,
      hash: [],
      height: 1000,
    }

    this.onCollapseComments = this.onCollapseComments.bind(this)
    this.handleHashChange = this.handleHashChange.bind(this)
    this.toggleFileList = this.toggleFileList.bind(this)
    this.toggleCommentsList = this.toggleCommentsList.bind(this)
    this.changeDiffViewType = this.changeDiffViewType.bind(this)
    this.renderFileDiff = this.renderFileDiff.bind(this)
  }

  props: Props

  onCollapseComments(collapsed) {
    // NOTE: slow operation, the whole component will be rerendered
    this.setState({
      collapsedComments: collapsed,
    })
  }

  handleHashChange(value) {
    this.setState({
      hash: value,
    })
  }

  toggleFileList() {
    const value = this.state.showFileList
    this.setState({
      showFileList: !value,
    })
  }

  toggleCommentsList() {
    const value = this.state.showCommentsList
    this.setState({
      showCommentsList: !value,
    })
  }

  changeDiffViewType(value) {
    this.setState({ viewType: value })
  }

  renderFileDiff(file) {
    return (<Element
      key={_.uniqueId('_file_diff')}
      name={file.name.replace(/[/.]/g, '')}
      style={{ marginBottom: '20px' }}
    >
      <DiffHeader
        comments={file.comments.length > 0}
        title={file.name}
        stats={file.stats}
        onViewChangeClick={this.changeDiffViewType}
        onCollapse={this.onCollapseComments}
        selectedValue={this.state.viewType}
      />
      <Code
        viewType={this.state.viewType}
        loggedUsername={this.props.loggedUsername}
        collapseComments={this.state.collapsedComments}
        {...file}
      />
    </Element>)
  }

  render() {
    const { files } = this.props
    if (!files) {
      return null
    }
    return (
      <div id="codeReviewContainer">
        <Row>
          <Col md={6}>
            <a
              onClick={() => this.toggleFileList()}
              className="btn"
              style={{
                marginRight: '5px',
                color: 'white',
                backgroundColor: this.state.showFileList ? '#b9ebae' : 'lightgrey',
              }}
              aria-label="Show files list"
            >
              <i className="fa fa-th-list" aria-hidden="true" />
            </a>

          </Col>
          <Col md={4} style={{ float: 'right' }}>
            <div className="section">
              <Select
                multi
                simpleValue
                name="form-field-name"
                value={this.state.hash}
                placeholder="Filter by changeset"
                options={[]}
                onChange={this.handleHashChange}
                valueRenderer={this.renderValue}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          {this.state.showFileList &&
            <Col md={3}>
              <ChangesetFileList
                files={this.props.files}
                compact
                containerId="codeDiffContainerElement"
              />
            </Col>}

          <Col md={(this.state.showFileList || this.state.showCommentsList) ? 9 : 12}>
            <div
              id="codeDiffContainerElement"
              style={(this.state.showFileList || this.state.showCommentsList) ?
                { height: this.state.height, overflow: 'auto', position: 'relative' } : {}}
            >
              {files.map(file => this.renderFileDiff(file))}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CodeDiffView
