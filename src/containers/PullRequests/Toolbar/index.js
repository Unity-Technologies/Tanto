import React from 'react'
import { Filter, BranchSelect } from 'components'
import { Col, Row } from 'react-bootstrap'

const sort = [
  { value: 1, label: 'Creation date' },
  { value: 2, label: 'Last update date' },
  { value: 3, label: 'Changes size' },
  { value: 4, label: 'Comments number' },
  { value: 5, label: 'Builds count' },
  { value: 6, label: 'Reviewers count' },
  { value: 7, label: 'Versions count' },
]

export const branches = [
  { value: 1, label: 'default' },
  { value: 2, label: '5.3/devs/default' },
  { value: 3, label: '5.3/devs/feature1/feature' },
  { value: 4, label: '5.3/devs/feature2' },
  { value: 5, label: '5.3/devs/feature3' },
  { value: 6, label: '5.3/devs/feature4' },
]


function Toolbar(props) {
  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        padding: '10px',
      }}
    >
      <Row>
        <Col md={4}>
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

        <Col md={4}>
          <BranchSelect branches={branches} placeholder="Select branch ..." />
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
      </Row>
    </div>
  )
}

export default Toolbar
