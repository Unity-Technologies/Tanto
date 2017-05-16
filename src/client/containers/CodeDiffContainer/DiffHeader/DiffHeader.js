// TODO: finish flow annotations

import React, { Component } from 'react'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Navbar from 'react-bootstrap/lib/Navbar'
import ChangesetDelta from 'components/ChangesetDelta'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getReviewFile } from 'ducks/review/selectors'
import { setFileReview, setFileBookmark } from 'ducks/review/actions'
import './DiffHeader.css'

const navbarStyle = {
  backgroundColor: 'transparent',
  border: '1px solid lightgrey',
  borderRadius: '0px',
  fontSize: '14px',
  marginBottom: '-1px',
}

export type Props = {
  title: string,
  stats: {
    added: number,
    deleted: number
  },
  fileReview: {
    reviewed: boolean,
    bookmarked: boolean
  },
  collapsed: boolean,
  collapsedComments: boolean,
  onCollapse?: Function,
  onCollapseComments?: Function,
}

export const getData = createSelector(
  getReviewFile,
  (fileReview) => ({
    fileReview,
  })
)

class DiffHeader extends Component {
  props: Props

  handleDiffCollapseClick = (value: boolean) => {
    if (this.props.onCollapse) {
      this.props.onCollapse(value)
    }
  }

  handleFileReviewed = (reviewed: boolean) => {
    this.props.dispatch(setFileReview(this.props.pullRequestId, this.props.id, reviewed))
  }

  handleFileBookmarked = (bookmarked: boolean) => {
    this.props.dispatch(setFileBookmark(this.props.pullRequestId, this.props.id, bookmarked))
  }


  render() {
    const { title, stats, fileReview } = this.props

    return (
      <Navbar style={navbarStyle} fluid>
        <Nav>
          <NavItem>
            <div>
              <div onClick={this.handleDiffCollapseClick}>
                {!this.props.collapsed && <div onMouseDown={() => this.handleDiffCollapseClick(true)}>
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </div>}
                {this.props.collapsed &&
                  <div onMouseDown={() => this.handleDiffCollapseClick(false)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>}
              </div>

            </div>
          </NavItem>
          <NavItem>
            <div style={{ width: '150px', display: 'flex' }}>
              <div
                style={{ float: 'left', width: '120px', marginTop: '2px', marginRight: '5px' }}
              >
                <ChangesetDelta {...stats} /></div>
              <div>{title}</div>
            </div>
          </NavItem>
        </Nav>

        <Nav pullRight style={{ fontSize: '16px' }}>
          <NavItem onClick={() => this.handleFileReviewed(!fileReview.reviewed)}>
            <i className={`fa fa-check-square-o ${fileReview.reviewed ? 'reviewed' : ''}`} aria-hidden="true"></i>
          </NavItem>

          <NavItem onClick={() => this.handleFileBookmarked(!fileReview.bookmarked)}>
            <i className={`fa fa-tag ${fileReview.bookmarked ? 'bookmarked' : ''}`} aria-hidden="true"></i>
          </NavItem>
        </Nav>

      </Navbar>
    )
  }
}


export default connect(getData)(DiffHeader)
