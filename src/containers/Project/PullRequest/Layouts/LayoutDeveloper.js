/* @flow */
import React, { Component } from 'react'
import { Badge, Tabs, Tab } from 'react-bootstrap'
import Scroll from 'react-scroll'

import ChangesetFileList from 'components/ChangesetFileList'
import ChangesetGroupedList from 'components/ChangesetGroupedList'
import CodeDiffView from 'components/CodeDiffView'
import IssuesList from 'components/IssuesList'
import PullRequestDiscussion from 'components/PullRequestDiscussion'
import PullRequestSummary from 'components/PullRequestSummary'

import type { PullRequestGraphType } from 'ducks/pullRequest'

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

export type Props = {
  pullRequest: PullRequestGraphType,
};

class LayoutDeveloper extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: null,
      toggleReviewers: false,
      key: 1,
    };

    // semi colons are needed for this flow workaround
    (this:any).addReviewer = this.addReviewer.bind(this);
    (this:any).toggleReviewers = this.toggleReviewers.bind(this)
  }

  state: {
    value: ?string,
    reviewers?: Array<any>,
    toggleReviewers: boolean,
    key: number,
  }

  props: Props

  addReviewer(value: { name: string }) {
    window.alert('not implemted')
  }

  toggleReviewers() {
    const toggled = this.state.toggleReviewers
    this.setState({
      toggleReviewers: !toggled,
    })
  }

  render() {
    const { pullRequest } = this.props
    return (
      <div style={{ padding: '0 20px' }}>
        <Tabs defaultActiveKey={0} id="layout-developer-tabs">
          <Tab style={{ margin: '20px 0' }} eventKey={0} title="Summary">
            <PullRequestSummary
              onAddReviewer={this.addReviewer}
              onToggleReviewers={this.toggleReviewers}
              pullRequest={pullRequest}
              toggleReviewers={this.state.toggleReviewers}
            />
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={1} title={tabTitle('Discussion', 4)}>
            <PullRequestDiscussion
              onSaveComment={() => {}}
            />
          </Tab>
          <Tab style={{ margin: '20px 0' }} eventKey={2} title="Files">
            <div>
              <ChangesetFileList files={pullRequest.files} />
            </div>
          </Tab>
          <Tab
            style={{ margin: '20px 0' }}
            eventKey={3}
            title={tabTitle('Changesets', downloadIcon)}
          >
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
