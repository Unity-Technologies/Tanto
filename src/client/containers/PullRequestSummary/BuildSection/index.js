/* @flow */

import React, { PureComponent } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import _ from 'lodash'

import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { connect } from 'react-redux'
import { fetchLatestBuildsForRevision } from 'ducks/bfstats/actions'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const success = {
  borderLeft: '5px solid rgb(214, 247, 229)',
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

const approvedColor = '#3f855b'

type BuildType = {
  builder: {
    name: string
  },
  result: number
}

type PropsType = {
  id: string,
  repository: string,
  revision: string,
  builds: Array<BuildType>,
}

export const getPROriginData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest,
    (pr) => ({
      revision: pr && pr.origin ? pr.origin.revision : null,
      repository: pr && pr.origin ? pr.origin.repository.fullName : null,
    })
  )

class BuildSection extends PureComponent {
  componentWillReceiveProps(nextprops) {
    if (!nextprops.repository || !nextprops.revision) {
      return
    }
    if (this.props.repository !== nextprops.repository ||
      this.props.revision !== nextprops.revision) {
      this.props.dispatch(fetchLatestBuildsForRevision(nextprops.repository, nextprops.revision))
    }
  }

  props: PropsType

  render() {
    if (!this.props.build) {
      return null
    }
    return (
      <ListGroupItem style={success}>
        <Row>
          <Col md={2}>
            <div style={headerColumnStyle}>
              Latest Katana builds
            </div>
          </Col>
          <Col md={3}>
            {subHeader('Status:')}
            <div>
              <div style={{ color: approvedColor, textTransform: 'uppercase' }}>
                Passed
              </div>
              <div style={{ fontSize: '12px' }}>(5 hours ago)</div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <div>
                {subHeader('Latest:')}
                <a href="#">ABV-48147</a>
                <div style={{ fontSize: '12px' }}>(5 builds in total)</div>
              </div>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </ListGroupItem>
    )
  }
}

export default connect(getPROriginData)(BuildSection)
