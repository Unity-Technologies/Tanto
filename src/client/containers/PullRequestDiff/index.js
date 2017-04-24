/* @flow */

import React, { PureComponent } from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import { getPullRequestFiles } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import ChangesetFileList from 'components/ChangesetFileList'
import { getLoggedUsername } from 'ducks/session/selectors'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import CodeDiffContainer from 'containers/CodeDiffContainer'
import { StickyContainer, Sticky } from 'react-sticky'
import { DiffTypes } from 'universal/constants'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

import Nav from 'react-bootstrap/lib/Nav'
import View from 'material-ui/svg-icons/action/view-module'
import Navbar from 'react-bootstrap/lib/Navbar'

type Props = {
  files: Array<FileType>,
  pullRequestId: string,
  loggedUsername: string,
}

export const getData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestFiles, getLoggedUsername,
    (files, user) => ({
      files,
      loggedUsername: user,
    })
  )

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

  handleChangeSingle = (event, value) => {
    this.setState({
      viewType: value,
    })
  }

  render() {
    if (!this.props.files || !this.props.files.length) {
      return null
    }

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
            {this.props.files.map(file =>
              <CodeDiffContainer viewType={this.state.viewType} id={file.id} pullRequestId={this.props.pullRequestId} />
            )}
          </Col>
        </Row>
      </StickyContainer>
    )
  }
}

export default connect(getData)(PullRequestDiff)
