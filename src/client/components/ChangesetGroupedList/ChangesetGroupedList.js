/* @flow */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import Panel from 'react-bootstrap/lib/Panel'
import _ from 'lodash'

import ChangesetList from 'components/ChangesetList'

import './ChangesetGroupedList.css'

export type Props = {
  data: Array<{
    data: Array<any>,
    version: string,
    date: string,
  }>,
  accordion: boolean,
}

class ChangesetGroupedList extends Component {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = { search: null, activeKey: 3 };

    (this:any).handleSelect = this.handleSelect.bind(this)
  }

  props: Props

  state: {
    search: ?string,
    activeKey: number,
  }

  handleSelect(activeKey: number) {
    this.setState({ activeKey })
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'inline-flex',
                border: '1px solid lightgrey',
                borderRadius: '5px',
                padding: '7px',
                width: '100%' }}
            >
              <span
                style={{ pagging: '10px', color: 'grey' }}
              >
                <i className="fa fa-search" aria-hidden="true" />
              </span>
              <input
                type="text"
                style={{
                  outline: 'none',
                  border: 'none',
                  marginLeft: '10px',
                  fontSize: '14px',
                  width: '100%' }}
              />
              <i
                className="fa fa-sort-amount-asc"
                style={{ color: 'lightgrey', margin: '1px 10px', fontSize: '16px' }}
                aria-hidden="true"
              />
            </div>
            <div
              style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
            >
              59 commits, common ancestor <a href="#hash">d28cde65aa3a</a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <PanelGroup
              accordion={this.props.accordion}
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
            >
              {this.props.data.map(chunk => (
                <Panel
                  key={_.uniqueId('panel')}
                  header={
                    <div style={{ display: 'inline-block', width: '100%', textDecoration: 'none' }}>
                      <div style={{ fontSize: '14px' }}>Version {chunk.version}
                        <span
                          style={{
                            color: 'rgb(122, 123, 123)',
                            fontSize: '13px',
                            padding: '10px',
                            float: 'right' }}
                        >{chunk.date}</span>
                      </div>
                      <div
                        style={{
                          color: 'rgb(122, 123, 123)',
                          fontSize: '12px',
                          fontStyle: 'italic',
                        }}
                      >
                        This iteration is based on another trunk revision
                        and there is no simple diff.
                      </div>
                    </div>
                  }
                  eventKey={chunk.version}
                  defaultExpanded
                >
                  <ChangesetList data={chunk.data} />
                </Panel>
              ))}
            </PanelGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ChangesetGroupedList
