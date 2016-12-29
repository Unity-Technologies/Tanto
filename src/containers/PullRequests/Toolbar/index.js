/* @flow */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import BranchSelect from '../BranchSelect'
import RepoSelect from '../RepoSelect'
import OrderSelect from '../OrderSelect'

type Props = {
  isSearching: boolean,
  repo: string,
  branch: string,
  order: string,
  field: string,
  onRepoSelect: Function,
  onBranchSelect: Function,
  onOrderChange: Function,
  onOrderFieldSelect: Function,
}

const UPDATED = 'UPDATED'

class Toolbar extends Component {
  // handleRepoSelect = (repo: number): void => {
  //   if (this.props.onRepoSelect) {
  //     this.props.onRepoSelect(repo)
  //   }
  // }

  // handleBranchSelect = (branch: string): void => {
  //   if (this.props.onBranchSelect) {
  //     this.props.onBranchSelect(branch)
  //   }
  // }

  // handleOrderChange = (order: string): void => {
  //   if (this.props.onOrderChange) {
  //     this.props.onOrderChange(order)
  //   }
  // }

  // handleOrderFieldSelect = (field: string): void => {
  //   if (this.props.onBranchSelect) {
  //     this.props.onBranchSelect(branch)
  //   }
  // }

  props: Props

  render() {
    return (
      <div
        style={{
          backgroundColor: '#f8f8f8',
          padding: '10px',
          marginBottom: '5px',
        }}
      >
        <Row>
          <Col md={3}>
            <RepoSelect onSelect={this.handleRepoSelect} />
          </Col>

          <Col md={3}>
            <BranchSelect
              repoId={this.state.repo}
              onSelect={this.handleBranchChange}
            />
          </Col>

          <Col md={4}>
            <OrderSelect
              options={[UPDATED]}
              onSelect={this.handleOrderFieldSelect}
              onOrderChange={this.handleOrderSelect}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Toolbar
