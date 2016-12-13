// TODO: add flow annotations

import React, { Component } from 'react'
import { ListGroup, Pagination } from 'react-bootstrap'
import './styles.css'

export type Props = {
  pageSize: number,
  total: number,
  activePage: number,
  onPageSelect?: Function,
}

class List extends Component {
  constructor(props: Props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  props: Props

  handleSelect(eventKey: number) {
    this.setState({
      activePage: eventKey,
    })
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
