/* @flow */
/* eslint-disable max-len */

import React, { Component } from 'react'
import { Badge, Tabs, Tab } from 'react-bootstrap'
import Scroll from 'react-scroll'

import {
  ChangesetFileList,
  ChangesetGroupedList,
  CodeDiffView,
  IssuesList,
} from 'components'
import PullRequestDiscussion from 'components/PullRequestDiscussion'
import PullRequestSummary from 'components/PullRequestSummary'
import {
  PullRequestData, prChangesetList, prIssues,
} from '../../../../api/testPullRequest'

const Element = Scroll.Element

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>
      {text}
    </div>
    {!!badge &&
      <div style={{ marginRight: '15px' }}>
        <Badge>
          {badge}
        </Badge>
      </div>
    }
  </div>
)

const downloadIcon = <i className="fa fa-download" aria-hidden="true" />

class LayoutDeveloper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      reviewers: ['Jesper Mortensen'],
      toggleReviewers: false,
      key: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    this.addReviewer = this.addReviewer.bind(this)
    this.toggleReviewers = this.toggleReviewers.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange(event, index, value) {
    this.setState({
      value,
    })
  }

  addReviewer(value) {
    const r = this.state.reviewers
    if (!r.includes(value.name)) {
      r.push(value.name)
      this.setState({
        reviewers: r,
      })
    }
  }

  toggleReviewers() {
    const toggled = this.state.toggleReviewers
    this.setState({
      toggleReviewers: !toggled,
    })
  }

  handleSelect(key) {
    this.setState({
      key,
    })
  }

  render() {
    return (
      <div style={{ padding: '0 20px' }}>
        <Tabs defaultActiveKey={0} id="layout-developer-tabs">
          <Tab style={{ margin: '20px 0' }} eventKey={0} title="Summary">
            <PullRequestSummary
              onAddReviewer={this.addReviewer}
              onToggleReviewers={this.toggleReviewers}
              reviewers={this.state.reviewers}
              toggleReviewers={this.state.toggleReviewers}
            />
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={1} title={tabTitle('Discussion', 4)}>
            <PullRequestDiscussion />
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={2} title="Files">
            <div>
              <ChangesetFileList files={PullRequestData} />
            </div>
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={3} title={tabTitle('Changesets', downloadIcon)}>
            <div>
              <ChangesetGroupedList accordion={false} data={prChangesetList} />
            </div>
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={4} title={tabTitle('Issues', 2)}>
            <div>
              <IssuesList issues={prIssues} />
            </div>
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={5} title="Diff">
            <div>
              <CodeDiffView files={PullRequestData} />
            </div>
          </Tab>
        </Tabs>
        <Element name="page-bottom" />
      </div>
    )
  }
}

export default LayoutDeveloper
