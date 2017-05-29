/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import ChangesetFileList from 'components/ChangesetFileList'
import _ from 'lodash'
import SplitPane from 'react-split-pane-style-fix'
import { StickyContainer, Sticky } from 'react-sticky'
import { DiffTypes, PullRequestSettings } from 'universal/constants'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { createInlineComment, updateComment, deleteInlineComment } from 'ducks/comments/actions'
import Nav from 'react-bootstrap/lib/Nav'
import View from 'material-ui/svg-icons/action/view-module'
import Navbar from 'react-bootstrap/lib/Navbar'
import Page from './Page'
import { getData } from './selectors'

import './PullRequestDiff.css'

type Props = {
  files: Array<FileType>,
  pullRequestId: string,
  repoName: string,
  dispatch: Function,
  reviews: Object,
}

const splitStyle = { position: 'relative' }
const leftPaneStyle = { marginRight: '10px' }
const rightPaneStyle = { marginLeft: '10px' }

export class PullRequestDiff extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      viewType: DiffTypes.UNIFIED,
    }
  }
  props: Props
  state: {
    viewType: number,
  }

  handleCreateInlineComment = (filePath: string, lineNumber: string, text: string, issue: any) => {
    if (!lineNumber || !text) {
      return
    }
    const { repoName, pullRequestId } = this.props
    this.props.dispatch(createInlineComment(repoName, pullRequestId, filePath, lineNumber, text, issue))
  }

  handleUpdateInlineComment = (commentId: string, text: string) => {
    if (!commentId || !text) {
      return
    }
    this.props.dispatch(updateComment(commentId, text))
  }

  handleDeleteInlineComment = (commentId: string, filePath: string) => {
    if (!commentId) {
      return
    }
    this.props.dispatch(deleteInlineComment(commentId, filePath))
  }

  handleChangeSingle = (event: any, value: Object) => {
    this.setState({
      viewType: value,
    })
  }

  render() {
    if (!this.props.files || !this.props.files.length) {
      return null
    }
    const pages = _.chunk(this.props.files, PullRequestSettings.DIFF_PAGE_SIZE || 5)
    const containerId = 'diffContainer'
    return (
      <StickyContainer>
        <SplitPane split="vertical" minSize={100} defaultSize={440} style={splitStyle}>
          <div style={leftPaneStyle}>
            <Sticky>
              <ChangesetFileList
                files={this.props.files}
                reviews={this.props.reviews}
                compact
                containerElementName={containerId}
              />
            </Sticky>
          </div>
          <div id="containerElementName" style={rightPaneStyle}>
            <Navbar fluid>
              <Nav pullRight>
                <IconMenu
                  menuStyle={{ border: '1px solid lightgrey' }}
                  iconButtonElement={<IconButton><View /></IconButton>}
                  onChange={this.handleChangeSingle}
                  value={this.state.viewType}
                >
                  <MenuItem value={DiffTypes.UNIFIED} primaryText="Unified diff" />
                  <MenuItem value={DiffTypes.SIDE_BY_SIDE} primaryText="Side by side diff" />
                  <MenuItem value={DiffTypes.RAW} primaryText="Raw view" />
                </IconMenu>
              </Nav>
            </Navbar>
            <Page
              visible
              files={pages[0]}
              index={1}
              fileReviews={this.props.reviews}
              viewType={this.state.viewType}
              pullRequestId={this.props.pullRequestId}
              onCreateInlineComment={this.handleCreateInlineComment}
              onDeleteInlineComment={this.handleDeleteInlineComment}
              onUpdateInlineComment={this.handleUpdateInlineComment}
            />
            {_.tail(pages).map((page, index) =>
              (<Page
                files={page}
                fileReviews={this.props.reviews}
                index={index + 1}
                viewType={this.state.viewType}
                pullRequestId={this.props.pullRequestId}
                onCreateInlineComment={this.handleCreateInlineComment}
                onDeleteInlineComment={this.handleDeleteInlineComment}
                onUpdateInlineComment={this.handleUpdateInlineComment}
              />),
            )}
          </div>
        </SplitPane>
      </StickyContainer>
    )
  }
}

export default connect(getData)(PullRequestDiff)
