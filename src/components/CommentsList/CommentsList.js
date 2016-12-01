import React, { PropTypes, Component } from 'react'
import { TestAvatar } from 'components'
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import './CommentsList.css'

class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.state = { search: null }
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
            7 unresolved comments
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ListGroup style={{ fontSize: '13px', overflowY: 'auto', overflowX: 'hidden' }}>
              {this.props.comments.map(comment => (
                <ListGroupItem style={{ padding: '10px 10px' }} >
                  <div style={{ display: 'inline-block' }}>
                    <TestAvatar />
                    <div style={{ padding: '0 10px', display: 'table' }}>
                      <div style={{ fontSize: '13px', color: '#aaa7a7' }}>
                        <strong>
                          <a href="#line">line 23</a>
                        </strong>
                        <span style={{ fontStyle: 'italic', float: 'right' }}>3 minutes ago</span>
                      </div>
                      <span style={{ fontSize: '13px' }}>{comment.date}</span>
                      <div className="comment">{comment.message}</div>
                    </div>
                  </div>
                </ListGroupItem>))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

CommentsList.propTypes = {
  comments: PropTypes.any,
}

export default CommentsList
