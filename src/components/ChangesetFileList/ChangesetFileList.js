/* @flow */

import React, { PropTypes, Component } from 'react'
import { ChangesetDelta } from 'components'
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import Scroll from 'react-scroll'
import _ from 'lodash'

import './ChangesetFileList.css'

const Link = Scroll.Link

class ChangesetFileList extends Component {
  constructor(props) {
    super(props)
    this.state = { search: null }
  }

  render() {
    const { containerId } = this.props

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
              <span style={{ pagging: '10px', color: 'grey' }}>
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
            </div>
            <div style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }} active>
            225 files changed with 1871 insertions and 8737 deletions
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ListGroup style={{ fontSize: '13px', overflowY: 'auto', overflowX: 'hidden' }}>
              {this.props.files.map(file => (
                <ListGroupItem key={_.uniqueId('listItem')} style={{ padding: '10px 10px' }} >
                  <Row>
                    {!this.props.compact &&
                      <Col lg={2} md={2} xsHidden smHidden>
                        <ChangesetDelta
                          deleted={Math.floor((Math.random() * 10) + 1)}
                          added={Math.floor((Math.random() * 10) + 1)}
                          changed={Math.floor((Math.random() * 10) + 1)}
                        />

                      </Col>
                    }
                    <Col lg={8} md={8} sm={8} xs={8}>
                      <div>
                        <Link
                          style={{ cursor: 'pointer' }}
                          containerId={containerId}
                          activeClass="active"
                          to={file.name.replace(/[/.]/g, '')}
                          spy
                          smooth
                          duration={100}
                        >
                          {file.name}
                        </Link>
                      </div>
                    </Col>
                    <Col
                      lg={this.props.compact ? 4 : 2}
                      md={this.props.compact ? 4 : 2}
                      sm={this.props.compact ? 4 : 2}
                      xs={this.props.compact ? 4 : 2}
                    >
                    {file.comments.length > 0 &&
                      <div style={{ color: 'lightblue', cursor: 'pointer', float: 'right' }}>
                        <span style={{ marginRight: '5px' }}>
                          <i className="fa fa-comment" aria-hidden="true" />
                        </span>
                        {file.comments.length}
                      </div>
                    }
                    </Col>
                  </Row>
                </ListGroupItem>))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

ChangesetFileList.propTypes = {
  files: PropTypes.array,
  compact: PropTypes.bool,
  containerId: PropTypes.string,
}

export default ChangesetFileList
