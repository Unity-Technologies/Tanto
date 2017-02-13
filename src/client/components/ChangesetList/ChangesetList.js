// todo: remove this after refactoring component
/* eslint-disable */

import React, { Component } from 'react'
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
import Checkbox from 'material-ui/Checkbox'
import { ChangesetStatus } from 'universal/constants'
import _ from 'lodash'

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
}

const greenStatus = { borderLeft: '4px solid #d1fad1' }
const redStatus = { borderLeft: '4px solid #F44336' }
const yellowStatus = { borderLeft: '4px solid #ffcbad' }
const greyStatus = { borderLeft: '4px solid lightgrey' }

const getStatusColor = (status) => {
  switch (status) {
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
  const stats= _.reduceRight(files, (flattened, other) => {
    return flattened.concat(other.stats);
  }, []);

  return _.reduce(stats, (statsRes, stat) => {
      for (let prop in stat) {
        if (!(prop in statsRes)) {
          statsRes[prop] = 0
        }
        statsRes[prop] += stat[prop]
      }
      return statsRes
  }, {})
}

class ChangesetList extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { search: null, activeKey: 3, changesets: [] }
  }

  props: Props

  handleSelect = (activeKey) => {
    this.setState({ activeKey })
  }

  handleChange = (obj, isSelected) => {
    if (this.state.changesets.length < 2 && isSelected) {
      this.state.changesets.push(obj.target.value)
    }
    if (this.state.changesets.length <= 2 && !isSelected) {
      const index = this.state.changesets.indexOf(obj.target.value)
      if (index !== -1) {
        this.state.changesets.splice(index, 1)
      }
      this.props.commits.map((item) => {
        const ch = this.refs[item.hash]
        ch.setState({ disabled: false })
        return true
      })
    }

    if (this.state.changesets.length === 2) {
      this.props.commits.map((item) => {
        const ch = this.refs[item.hash]
        ch.setState({ disabled: !this.state.changesets.includes(item.hash) })
        return true
      })
    }
  }

  render() {
    if (!this.props.commits) {
      return null
    }

    const { commits, showCheckboxes, id, projectName } = this.props

    return (
      <ListGroup
        fill
        style={{
          fontSize: '13px',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
        >
        {commits.map(item => (
          <ListGroupItem
            key={_.uniqueId('listItem')}
            style={getStatusColor(item.status)}
            >
            <div>
              <Row>
                <Col lg={5} md={7} sm={9} xs={12}>
                  <div style={{ display: 'table' }}>
                    {showCheckboxes ?
                      <Checkbox
                        disableTouchRipple
                        style={{ float: 'left', padding: '10px', width: 'auto' }}
                        /> : ''}
                    <Avatar />
                    <div style={{ paddingLeft: '10px', display: 'table' }}>
                      <Link
                        style={{
                          cursor: 'pointer',
                          fontWeight: '400'
                        }}
                        to={buildChangesetLink(projectName, item.rawId)}
                        >
                        {item.message}
                      </Link>

                      <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                        <strong>{item.author}</strong>, added {moment(item.date).fromNow()}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={2} md={3} smHidden xsHidden>
                  <div
                    style={{
                      color: '#5a6082',
                      display: 'inline-block', borderRadius: '3px',
                      border: '1px solid lightgrey'
                    }}
                    >
                    <i style={{ fontSize: '14px', padding: '2px', borderRight: '1px solid lightgrey', padding: '7px', cursor: 'pointer' }} className="fa fa-clipboard" aria-hidden="true" />
                    <Link
                      style={{ padding: '10px', textDecoration: 'none', color: '#5a6082', textTransform: 'uppercase', fontSize: '12px' }}
                      to={buildChangesetLink(projectName, item.id)}
                      >
                      {item.id.substring(0, 9)}
                    </Link>
                  </div>

                </Col>
                <Col lg={2} mdHidden smHidden xsHidden >
                  <div>
                    {subHeader('Branch:')}
                    <div>
                      <a style={{ textDecoration: 'none', color: '#5a6082' }} href="#">{item.branch}</a>
                    </div>
                  </div>

                </Col>
                <Col lg={1} mdHidden smHidden xsHidden>
                  {item.build &&
                    <div>
                      {subHeader('Status:')}
                      <div style={{ color: item.build.status === 0 ? '#51b583' : '#ca5757', textTransform: 'uppercase' }}>
                        Passed
                        </div>
                    </div>
                  }
                </Col>
                <Col lg={1} mdHidden smHidden xsHidden>
                  {item.build &&
                    <div>
                      {subHeader('Builds:')}
                      <a href="#" style={{ color: '#5a6082', textTransform: 'uppercase', textDecoration: 'none' }}>
                        {item.build.name}
                      </a>
                    </div>
                  }
                </Col>
                <Col lg={1} md={2} sm={3} xsHidden>
                  <ChangesetDelta {...reduceCommitDelta(item.files)} />
                </Col>
              </Row>
            </div>
          </ListGroupItem>))}
      </ListGroup>
    )
  }
}

export default ChangesetList
