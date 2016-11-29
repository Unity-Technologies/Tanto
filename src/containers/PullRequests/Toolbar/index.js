import React from 'react'
import { Filter, BranchSelect } from 'components'
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap'

export const sort = [
  { value: 1, label: 'Creation date' },
  { value: 2, label: 'Last update date' },
  { value: 3, label: 'Changes size' },
  { value: 4, label: 'Comments number' },
  { value: 5, label: 'Builds count' },
  { value: 6, label: 'Reviewers count' },
  { value: 7, label: 'Versions count' },
]

const approveButtonStyle = {
  backgroundColor: '#1fb5ad',
  borderColor: '#1fb5ad',
  color: 'white',
}

function Toolbar(props) {
  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        marginBottom: '20px',
        border: '1px solid rgb(226, 226, 226)',
        borderRadius: '4px',
        padding: '10px',
      }}
    >
      <Row>
        <Col md={3}>
          <div
            style={{
              display: 'inline-flex',
              border: '1px solid lightgrey',
              borderRadius: '5px',
              padding: '7px',
              width: '100%',
              backgroundColor: 'white',
            }}
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
                width: '100%',
              }}
            />

          </div>
        </Col>

        <Col md={3}>
          <BranchSelect placeholder="Select branch ..." />
        </Col>

        <Col md={4}>
          <div style={{ float: 'left', marginRight: '5px' }}>
            <Filter data={sort} placeholder="Order by..." />
          </div>
          <div style={{ float: 'left', marginRight: '5px' }}>
            <a
              className="btn"
              style={{
                color: 'white',
                backgroundColor: '#b9ebae',
              }} aria-label="Sort ascending"
            >
              <i className="fa fa-sort-amount-asc" aria-hidden="true" />
            </a>
          </div>
          <div style={{ float: 'left' }}>
            <a
              className="btn"
              style={{
                color: 'white',
                backgroundColor: 'lightgrey',
              }} aria-label="Sort descending"
            >
              <i className="fa fa-sort-amount-desc" aria-hidden="true" />
            </a>
          </div>
        </Col>

        <Col md={2}>
          <ButtonGroup style={{ float: 'right' }}>
            <Button style={approveButtonStyle}>
              New Pull Request
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  )
}

export default Toolbar
