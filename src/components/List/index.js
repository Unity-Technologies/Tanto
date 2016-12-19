// TODO: enable flow, issue for components that use props.children
// https://github.com/facebook/flow/issues/1820

import React, { Component } from 'react'
import { ListGroup, Pagination } from 'react-bootstrap'
import './styles.css'

export type Props = {
  pageSize: number,
  total: number,
  activePage: number,
  children: any,
  onPageSelect: Function,
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
