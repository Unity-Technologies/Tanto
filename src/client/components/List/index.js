/* @flow */

import React, { Component } from 'react'
import Pagination from 'react-bootstrap/lib/Pagination'
import ListGroup from 'react-bootstrap/lib/ListGroup'

import './styles.css'

export type Props = {
  pageSize: number,
  total: number,
  activePage: number,
  children?: number | string | React.Element <*> | Array < any >,
  onPageSelect?: Function,
}

class List extends Component {
  props: Props

  handleSelect = (eventKey: number) => {
    if (this.props.onPageSelect) {
      this.props.onPageSelect(eventKey)
    }
  }

  render() {
    const { pageSize, total, children, activePage } = this.props
    const totalPagesCount = Math.ceil(total / pageSize)
    return (
      <div>
        <ListGroup
          fill
          className="list-group"
        >
          {children}
        </ListGroup>

        {totalPagesCount > 1 &&
          <div className="pagination-parent">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={totalPagesCount}
              maxButtons={5}
              activePage={activePage}
              onSelect={this.handleSelect}
              className="pagination"
            />
          </div>
        }
      </div>
    )
  }
}

export default List
