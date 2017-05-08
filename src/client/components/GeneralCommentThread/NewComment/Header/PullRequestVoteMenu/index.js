/* @flow */
import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Popover from 'react-bootstrap/lib/Popover'
import Overlay from 'react-bootstrap/lib/Overlay'
import { ChangesetStatus as status } from 'universal/constants'
import RemoveIcon from 'components/Icon/RemoveIcon'

import './PullRequestVoteMenu.css'

const ApproveIcon = () => <i className="fa fa-thumbs-o-up approve" aria-hidden="true" />
const RequestChangesIcon = () => <i className="fa fa-hand-paper-o request-changes" aria-hidden="true" />
const VoteIcon = () => <i className="fa fa-thumbs-up action-icon" aria-hidden="true" />

const VoteForPRIcon = ({ icon } : Object) => {
  switch (icon) {
    case status.APPROVED:
      return <ApproveIcon />
    case status.REJECTED:
      return <RequestChangesIcon />
    case status.NONE:
    default:
      return <VoteIcon />
  }
}

const PopoverVoteForPR = ({ onReviewAction, ...props }) => (
  <Overlay
    {...props}
    rootClose
  >
    <Popover id="vote-pr-actions" title="Vote for pull request">
      <div className="popover-actions">
        <Button className="popover-action" onClick={(e) => onReviewAction(status.APPROVED)}>
          <ApproveIcon />
        </Button>
        <Button className="popover-action" onClick={(e) => onReviewAction(status.REJECTED)}>
          <RequestChangesIcon />
        </Button>
        <Button className="popover-action" onClick={(e) => onReviewAction(status.NONE)}>
          <RemoveIcon />
        </Button>
      </div>
    </Popover>
  </Overlay>
)

type Props = {
  onReviewAction: (action: string) => void,
}

class PullRequestVoteMenu extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      show: false,
      reviewStatus: status.NONE,
      target: null,
    }
  }

  state: {
    show: boolean,
    reviewStatus: string,
    target: ?Object,
  }

  handleReviewAction = (action: string) => {
    this.setState({
      reviewStatus: action,
    })
    if (this.props.onReviewAction) {
      this.props.onReviewAction(action)
    }
    this.hide()
  }

  handleClick = (e: Event) => {
    this.setState({
      target: e.target,
      show: true,
    })
  }

  handleHide = () => {
    this.hide()
  }

  hide = () => {
    this.setState({
      show: false,
    })
  }

  render() {
    return (
      <Button className="action-button" onClick={this.handleClick}>
        <VoteForPRIcon icon={this.state.reviewStatus} />
        <PopoverVoteForPR
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          onHide={this.handleHide}
          onReviewAction={this.handleReviewAction}
        />
      </Button>
    )
  }

}

export default PullRequestVoteMenu
