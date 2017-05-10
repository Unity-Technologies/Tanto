/* @flow */

import React, { PureComponent } from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import ChangesetFileList from 'components/ChangesetFileList'
import { getData } from './selectors'
import _ from 'lodash'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { StickyContainer, Sticky } from 'react-sticky'
import { DiffTypes } from 'universal/constants'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { createInlineComment, updateComment, deleteInlineComment } from 'ducks/comments/actions'
import Nav from 'react-bootstrap/lib/Nav'
import View from 'material-ui/svg-icons/action/view-module'
import Navbar from 'react-bootstrap/lib/Navbar'
import Page from './Page'

type Props = {
  files: Array<FileType>,
  pullRequestId: string,
  loggedUsername: string,
  repoName: string,
  dispatch: Function,
}

class PullRequestDiff extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      viewType: DiffTypes.UNIFIED,
    }
  }
  props: Props
  state: {
    viewType: number,
  }

  handleCreateInlineComment = (filePath: string, lineNumber: string, text: string) => {
    if (!lineNumber || !text) {
      return
    }
    const { repoName, pullRequestId } = this.props
    this.props.dispatch(createInlineComment(repoName, pullRequestId, filePath, lineNumber, text))
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

  handleChangeSingle = (event, value) => {
    this.setState({
      viewType: value,
    })
  }

  render() {
    if (!this.props.files || !this.props.files.length) {
      return null
    }
    const pages = _.chunk(this.props.files, 3)
    const containerId = 'diffContainer'
    return (
      <StickyContainer>
        <Row>
          <Col md={4}>
            <Sticky>
              <ChangesetFileList
                files={this.props.files}
                compact
                containerElementName={containerId}
              />
            </Sticky>
          </Col>
          <Col md={8} id="containerElementName">
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
              viewType={this.state.viewType}
              pullRequestId={this.props.pullRequestId}
              onCreateInlineComment={this.handleCreateInlineComment}
              onDeleteInlineComment={this.handleDeleteInlineComment}
              onUpdateInlineComment={this.handleUpdateInlineComment}
            />
            {_.tail(pages).map((page, index) =>
              <Page
                files={page}
                index={index + 1}
                viewType={this.state.viewType}
                pullRequestId={this.props.pullRequestId}
                onCreateInlineComment={this.handleCreateInlineComment}
                onDeleteInlineComment={this.handleDeleteInlineComment}
                onUpdateInlineComment={this.handleUpdateInlineComment}
              />
            )}
          </Col>
        </Row>
      </StickyContainer>
    )
  }
}

export default connect(getData)(PullRequestDiff)
