// TODO: add flow annotations

import React, { Component } from 'react'
import Scroll from 'react-scroll'

import {
  ChangesetFileList,
  ChangesetGroupedList,
  CodeDiffView,
  Divider,
  IssuesList,
} from 'components'
import PullRequestDiscussion from 'components/PullRequestDiscussion'
import PullRequestSummary from 'components/PullRequestSummary'
import {
  PullRequestData, prChangesetList, prIssues,
} from '../../../../api/testPullRequest'

const Element = Scroll.Element

class LayoutGuardian extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: null,
      reviewers: ['Jesper Mortensen'],
      toggleReviewers: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.addReviewer = this.addReviewer.bind(this)
    this.toggleReviewers = this.toggleReviewers.bind(this)
  }

  props: Props;

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


  render() {
    return (
      <div style={{ padding: '0 20px' }}>
        <Element name="page-top" className="element" />
        <Element name="summary" className="element">
          <div>
            <PullRequestSummary
              onAddReviewer={this.addReviewer}
              onToggleReviewers={this.toggleReviewers}
              toggleReviewers={this.state.toggleReviewers}
            />
          </div>
        </Element>
        <Element name="files" className="element">
          <Divider text="Files" />
          <div>
            <ChangesetFileList files={PullRequestData} />
          </div>
        </Element>
        <Element name="changesets" className="element">
          <Divider text="Changesets" />
          <div>
            <ChangesetGroupedList accordion data={prChangesetList} />
          </div>
        </Element>
        <Element name="issues" className="element">
          <Divider text="Issues" />
          <div>
            <IssuesList issues={prIssues} />
          </div>
        </Element>
        <Element name="discussion" className="element">
          <Divider text="Discussion" />
          <PullRequestDiscussion
            onSaveComment={() => {}}
          />
        </Element>
        <Element name="diff" className="element">
          <Divider text="Diff" />
          <div>
            <CodeDiffView files={PullRequestData} />
          </div>
        </Element>
        <Element name="page-bottom" />
      </div>
    )
  }
}

export default LayoutGuardian
