// TODO: finish flow annotations

import React, { Component } from 'react'
import Scroll from 'react-scroll'
import _ from 'lodash'
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import ChangesetFileList from '../ChangesetFileList'
import CommentsList from '../CommentsList'

import DiffHeader from './DiffHeader/DiffHeader'
import {
  PullRequestData, PullRequestHistory2, PullRequestUnresolvedComments,
} from '../../api/testPullRequest'
import Code from './Code/Code'
import './CodeDiffView.css'

const Element = Scroll.Element

export type Props = {
  files: Array<any>,
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
        onViewChangeClick={this.changeDiffViewType}
        onCollapse={this.onCollapseComments}
        selectedValue={this.state.viewType}
      />
      <Code
        viewType={this.state.viewType}
        collapseComments={this.state.collapsedComments}
        {...file}
      />
    </Element>)
  }

  render() {
    const { files } = this.props
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

            <a
              onClick={() => this.toggleCommentsList()}
              className="btn"
              style={{
                color: 'white',
                marginRight: '5px',
                backgroundColor: this.state.showCommentsList ? '#71b8db' : 'lightgrey' }}
              aria-label="Show comments list"
            >
              <i className="fa fa-comments" aria-hidden="true" />
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
                options={PullRequestHistory2}
                onChange={this.handleHashChange}
                valueRenderer={this.renderValue}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          {this.state.showFileList && this.state.showCommentsList &&
            <Col md={3}>
              <Tabs defaultActiveKey={1} id="code-diff-tabs">
                <Tab style={{ padding: '10px 0' }} eventKey={1} title="Files">
                  <ChangesetFileList
                    files={PullRequestData}
                    compact
                    containerId="codeDiffContainerElement"
                  />
                </Tab>
                <Tab style={{ padding: '10px 0' }} ventKey={2} title="Comments">
                  <CommentsList
                    comments={PullRequestUnresolvedComments}
                    containerId="codeDiffContainerElement"
                  />
                </Tab>
              </Tabs>
            </Col>}
          {this.state.showFileList && !this.state.showCommentsList &&
            <Col md={3} style={{ height: this.state.height }}>
              <ChangesetFileList
                files={PullRequestData}
                compact
                containerId="codeDiffContainerElement"
              />
            </Col>}
          {this.state.showCommentsList && !this.state.showFileList &&
            <Col md={3} style={{ height: this.state.height }}>
              <CommentsList
                comments={PullRequestUnresolvedComments}
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
