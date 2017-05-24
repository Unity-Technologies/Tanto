/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import Panel from 'react-bootstrap/lib/Panel'
import _ from 'lodash'
import type { ChangesetType } from 'universal/types'

import ChangesetList from 'components/ChangesetList'

import './ChangesetGroupedList.css'

export type ChangesetGroupType = {
  version: string,
  commits: Array<ChangesetType>
}

export type Props = {
  groups: Array<ChangesetGroupType>,
  accordion: boolean,
}

class ChangesetGroupedList extends PureComponent {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = { search: null, activeKey: 3 }
  }

  props: Props

  state: {
    search: ?string,
    activeKey: number,
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return nextProps.groups && nextProps.groups.length &&
      super.shouldComponentUpdate(nextProps, nextState)
  }

  handleSelect = (activeKey: number) => {
    this.setState({ activeKey })
  }

  render() {
    const { groups } = this.props
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
                width: '100%',
              }}
            >
              <span
                style={{ pagging: '10px', color: 'grey' }}
              >
                <i className="fa fa-search" />
              </span>
              <input
                type="text"
                style={{
                  outline: 'none',
                  border: 'none',
                  marginLeft: '10px',
                  fontSize: '14px',
                  width: '100%',
                }}
              />
              <i
                className="fa fa-sort-amount-asc"
                style={{ color: 'lightgrey', margin: '1px 10px', fontSize: '16px' }}

              />
            </div>
            <div
              style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
            >
              showed commits for {groups.length} versions of PR
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
              {groups.map(chunk => (
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
                            float: 'right',
                          }}
                        >{chunk.commits.length > 0 ? chunk.commits[0].date : ''}</span>
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
                  <ChangesetList commits={chunk.commits} />
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
