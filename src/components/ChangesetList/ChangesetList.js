// todo: remove this after refactoring component
/* eslint-disable */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

import ChangesetDelta from 'components/ChangesetDelta'
import TestAvatar from 'components/TestAvatar'
import { Link } from 'react-router'
import Checkbox from 'material-ui/Checkbox'
import _ from 'lodash'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)

export type Props = {
  data: Array<any>,
  compact?: boolean,
  showCheckboxes?: boolean,
}

class ChangesetList extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { search: null, activeKey: 3, changesets: [] }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  props: Props

  handleSelect(activeKey) {
    this.setState({ activeKey })
  }

  handleChange(obj, isSelected) {
    if (this.state.changesets.length < 2 && isSelected) {
      this.state.changesets.push(obj.target.value)
    }
    if (this.state.changesets.length <= 2 && !isSelected) {
      const index = this.state.changesets.indexOf(obj.target.value)
      if (index !== -1) {
        this.state.changesets.splice(index, 1)
      }
      this.props.data.map((item) => {
        const ch = this.refs[item.hash]
        ch.setState({ disabled: false })
        return true
      })
    }

    if (this.state.changesets.length === 2) {
      this.props.data.map((item) => {
        const ch = this.refs[item.hash]
        ch.setState({ disabled: !this.state.changesets.includes(item.hash) })
        return true
      })
    }
  }

  render() {
    const greenStatus = { borderLeft: '4px solid #d1fad1' }
    const yellowStatus = { borderLeft: '4px solid #ffcbad' }
    const greyStatus = { borderLeft: '4px solid lightgrey' }
    const { data, showCheckboxes, id } = this.props

    return (
      <ListGroup
        fill
        style={{
          fontSize: '13px',
          overflowY: 'auto',
          overflowX: 'hidden' }}
      >
        {data.map(item => (
            <ListGroupItem
              key={_.uniqueId('listItem')}
              style={{ padding: '10px 10px',
               ...(item.status === 1 ? greenStatus : (item.status === 2 ? yellowStatus : greyStatus)) }}
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
                      <TestAvatar />
                      <div style={{ paddingLeft: '10px', display: 'table' }}>
                        <Link
                          style={{
                          cursor: 'pointer',
                          fontWeight: '400' }}
                          to={`/project/${id}/changeset/${item.hash}`}
                        >
                          {item.message}
                        </Link>

                        <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                          <strong>{item.user}</strong>, added {item.date}
                        </div>
                      </div>
                    </div>
                  </Col>
                   <Col lg={2} md={3} smHidden xsHidden>
                    <div
                      style={{
                        color: '#5a6082',
                        display: 'inline-block', borderRadius: '3px',
                        border: '1px solid lightgrey' }}
                    >
                      <i style={{ fontSize: '14px', padding: '2px', borderRight: '1px solid lightgrey', padding: '7px', cursor: 'pointer' }} className="fa fa-clipboard" aria-hidden="true" />
                      <a style={{ padding: '10px', textDecoration: 'none', color: '#5a6082', textTransform: 'uppercase', fontSize: '12px' }} href="#">{item.hash}</a></div>

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
                    <ChangesetDelta
                      deleted={Math.floor((Math.random() * 100) + 20)}
                      added={Math.floor((Math.random() * 100) + 20)}
                      changed={Math.floor((Math.random() * 100) + 20)}
                    />
                  </Col>
                 </Row>
              </div>
            </ListGroupItem>))}
      </ListGroup>
    )
  }
}

export default ChangesetList
