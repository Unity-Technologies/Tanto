/* @flow */

import React, { Component } from 'react'
import { push } from 'react-router-redux'
import _ from 'lodash'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Changelog from 'pages/Repo/Changelog'
import ProjectPullRequests from 'pages/Repo/PullRequests'
import { buildRepoLink } from 'routes/helpers'

export type Props = {
  repository: Object,
  children?: Object,
  match: Object,
  theme?: Object,
}

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>{text}</div>
    {!!badge && <div className="tab-badge">{badge}</div>}
  </div>
)

const tabMap: Array<string> = ['files', 'changelog', 'pull_requests']


class Overview extends Component {

  constructor(props: Props) {
    super(props)
    if (!props.match.params.category) {
      this.state = { activeTab: 0 }
    } else {
      this.state = { activeTab: Number(_.findIndex(tabMap, (c) => c === this.props.match.params.category)) }
    }
  }
  state: Object
  handleOnSelect = (eventKey: number) => {
    this.setState({ activeTab: eventKey })
    const tab = tabMap[eventKey]
    const newUrl = `${buildRepoLink(this.props.repository.fullName)}/_/${tab}`
    if (newUrl !== this.props.location.pathname) {
      this.props.dispatch(push(newUrl))
    }
    return null
  }

  render() {
    const name = this.props.repository.fullName

    if (!this.props.repository) {
      return (<h1>Project {name} Not Found</h1>)
    }
    const repository = this.props.repository
    return (
      <div>
        <Tabs
          animation={false}
          defaultActiveKey={0}
          activeKey={this.state.activeTab}
          onSelect={this.handleOnSelect}
        >
          <Tab
            key="tab1"
            eventKey={0}
            className="tab"
            title={tabTitle('Files')}
          >
            {/* <Files repoId={repository.id}/> */}
            files
          </Tab>
          <Tab
            key="tab2"
            eventKey={1}
            className="tab"
            title={tabTitle('Changelog')}
          >
            <Changelog params={repository} />
          </Tab>
          <Tab
            key="tab3"
            eventKey={2}
            className="tab"
            title={tabTitle('Pull Requests')}
          >
            <ProjectPullRequests repo={repository.fullName} />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Overview
