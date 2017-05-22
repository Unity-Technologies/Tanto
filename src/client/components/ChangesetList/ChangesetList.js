/* @flow */
/* eslint-disable no-restricted-syntax, no-param-reassign */

import React from 'react'
import PureComponent from 'components/PureComponent'
import Col from 'react-bootstrap/lib/Col'
import moment from 'moment'
import Row from 'react-bootstrap/lib/Row'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type { ChangesetType } from 'universal/types'
import ChangesetDelta from 'components/ChangesetDelta'
import Avatar from 'components/Avatar'
import { Link } from 'react-router'
import { buildChangesetLink } from 'routes/helpers'
import Checkbox from 'components/Checkbox'
import { ChangesetStatus } from 'universal/constants'
import _ from 'lodash'
import CopyToClipboard from 'react-copy-to-clipboard'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)

export type Props = {
  commits: Array<ChangesetType>,
  compact?: boolean,
  projectName: string,
  showCheckboxes?: boolean,
  onSelectedChangesetsChange: (e: SyntheticInputEvent, number) => any,
}

const greenStatus = { borderLeft: '4px solid #d1fad1' }
const redStatus = { borderLeft: '4px solid #F44336' }
const yellowStatus = { borderLeft: '4px solid #ffcbad' }
const greyStatus = { borderLeft: '4px solid lightgrey' }

const getStatusColor = (status) => {
  switch (status.toUpperCase()) {
    case ChangesetStatus.REJECTED:
      return redStatus
    case ChangesetStatus.UNDER_REVIEW:
      return yellowStatus
    case ChangesetStatus.APPROVED:
      return greenStatus
    default:
      return greyStatus
  }
}

const reduceCommitDelta = (files) => {
  const stats = _.reduceRight(files, (flattened, other) => flattened.concat(other.stats), [])

  return _.reduce(stats, (statsRes, stat) => {
    for (const prop in stat) {
      if (!(prop in statsRes)) {
        statsRes[prop] = 0
      }
      statsRes[prop] += stat[prop]
    }
    return statsRes
  }, {})
}

class ChangesetList extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      search: null,
      activeKey: 3,
      changesets: [],
      copied: false,
      copiedValue: '',
      disabled: false,
    }
  }

  props: Props

  handleSelect = (activeKey: number) => {
    this.setState({ activeKey })
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return nextProps.commits && nextProps.commits.length &&
      super.shouldComponentUpdate(nextProps, nextState)
  }

  handleChange = (event: Object) => {
    const isSelected = event.target.checked

    if (this.state.changesets.length < 2 && isSelected) {
      this.state.changesets.push(event.target.value)
    }
    if (this.state.changesets.length <= 2 && !isSelected) {
      const index = this.state.changesets.indexOf(event.target.value)
      if (index !== -1) {
        this.state.changesets.splice(index, 1)
      }
      this.props.commits.map((item) =>
        this.setState({ disabled: false })
      )
    }
    if (this.state.changesets.length >= 2) {
      this.props.commits.map((item) =>
        this.setState({ disabled: !this.state.changesets.includes(item.id) })
      )
    }
    this.props.onSelectedChangesetsChange(event, this.state.changesets.length)
  }

  render() {
    if (!this.props.commits || !this.props.commits.length) {
      return null
    }

    const { commits, showCheckboxes, projectName } = this.props

    return (
      <ListGroup
        fill
        style={{
          fontSize: '13px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {commits.map(item => (
          <ListGroupItem
            key={_.uniqueId('listItem')}
            style={getStatusColor(item.status)}
          >
            <div>
              <Row>
                <Col md={4}>
                  <Avatar {...item.author.slack} />
                  <div style={{ display: 'table', paddingLeft: '10px' }}>
                    <Link
                      style={{
                        cursor: 'pointer',
                        fontWeight: '400',
                      }}
                      to={buildChangesetLink(projectName, item.id)}
                    >
                      {item.message}
                    </Link>

                    <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                      <strong>{item.authorUser ? item.authorUser.fullName : item.author}</strong>, added {moment(item.date).fromNow()}
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div
                    style={{
                      color: '#5a6082',
                      display: 'inline-block', borderRadius: '3px',
                      border: '1px solid lightgrey',
                    }}
                  >
                    <CopyToClipboard text={item.id} onCopy={() => this.setState({ copied: true })}>
                      <i
                        style={{ fontSize: '14px', borderRight: '1px solid lightgrey', padding: '7px', cursor: 'pointer' }}
                        className="fa fa-clipboard"
                      />
                    </CopyToClipboard>
                    <Link
                      style={{ padding: '10px', textDecoration: 'none', color: '#5a6082', textTransform: 'uppercase', fontSize: '12px' }}
                      to={buildChangesetLink(projectName, item.id)}
                    >
                      {item.id.substring(0, 9)}
                    </Link>
                  </div>
                </Col>
                <Col md={2}>
                  <div>
                    {subHeader('Branch:')}
                    <div>
                      <a style={{ textDecoration: 'none', color: '#5a6082' }} href="#">{item.branch}</a>
                    </div>
                  </div>
                </Col>
                <Col md={2}>
                  <ChangesetDelta {...reduceCommitDelta(item.files)} />
                </Col>
                <Col md={1}>
                  {showCheckboxes ?
                    <Checkbox
                      ref={item.id}
                      disableTouchRipple
                      onChange={this.handleChange}
                      value={item.id}
                      style={{ float: 'left', height: '15px', marginTop: '10px' }}
                      checked={this.state.changesets.indexOf(item.id) !== -1}
                      disabled={this.state.changesets.length >= 2 && this.state.changesets.indexOf(item.id) === -1}
                    /> : ''}
                </Col>
              </Row>
            </div>
          </ListGroupItem>))}
      </ListGroup>
    )
  }
}

export default ChangesetList
