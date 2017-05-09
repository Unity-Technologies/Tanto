/* @flow */
import React, { Component } from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import PullRequestVoteMenu from './PullRequestVoteMenu'
import IssueMenu from './IssueMenu'
import { IssueStatus, ChangesetStatus } from 'universal/constants'

type Props = {
  title: string,
  onReviewAction?: (action: string) => void,
  onCreateIssueAction?: (issue: string) => void,
}

class Header extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      issueStatus: IssueStatus.NONE,
      reviewStatus: ChangesetStatus.NONE,
    }
  }

  handleCreateIssueAction = (issue: string) => {
    this.setState({
      issueStatus: issue,
    })
    if (this.props.onCreateIssueAction) {
      this.props.onCreateIssueAction(issue)
    }
  }

  handleReviewAction = (action: string) => {
    this.setState({
      reviewStatus: action,
    })
    if (this.props.onReviewAction) {
      this.props.onReviewAction(action)
    }
  }

  props: Props
  render() {
    const renderVoteMenu = this.state.issueStatus === IssueStatus.NONE
    const renderIssueMenu = this.state.reviewStatus === ChangesetStatus.NONE
    return (
      <div className="comment-box-header edit-mode" >
        <div className="comment-title">{this.props.Title}</div>
        <div className="comment-box-actions">
          <ButtonToolbar>
            {renderVoteMenu && <PullRequestVoteMenu reviewStatus={this.state.reviewStatus} onStatusSelect={this.handleReviewAction} />}
            {renderIssueMenu && <IssueMenu issueStatus={this.state.issueStatus} onStatusSelect={this.handleCreateIssueAction} />}
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}

export default Header

