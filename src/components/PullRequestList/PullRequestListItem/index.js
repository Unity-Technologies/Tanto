import React, { PropTypes, Component } from 'react'
import { Col, Row, ListGroupItem } from 'react-bootstrap'
import { TestAvatar } from 'components'
import { Link } from 'react-router'

import './styles.css'

const subHeader = text => (
  <div className="sub-header">
    {text}
  </div>
)

class PullRequestListItem extends Component {
  constructor(props) {
    super(props)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleRemoveClick() {
    if (this.onRemoveClick) {
      this.onRemoveClick(this.id)
    }
  }

  render() {
    const {
      title,
      status,
      username,
      updated,
      link,
      origin,
      originLink,
      target,
      targetLink,
      buildName,
      buildStatus,
      buildDate,
      buildLink,
      showRemoveIcon,
     } = this.props

    return (
      <ListGroupItem style={{ borderLeft: `4px solid ${status}` }}>
        <Row>
          <Col md={5}>
            <div style={{ display: 'table' }}>
              <TestAvatar />
              <div style={{ paddingLeft: '10px', display: 'table' }}>
                <Link to={link}>{title}</Link>
                <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                  <strong>{username}</strong>, last updated {updated}
                </div>
              </div>
            </div>
          </Col>
          <Col md={2} >
            <div>
              {subHeader('Origin:')}
              <div>
                <Link
                  style={{ textDecoration: 'none', color: '#5a6082' }}
                  to={originLink}
                >
                  {origin}
                </Link>
              </div>
            </div>
          </Col>
          <Col md={2} >
            <div>
              {subHeader('Target:')}
              <div>
                <Link
                  style={{ textDecoration: 'none', color: '#5a6082' }}
                  to={targetLink}
                >
                  {target}
                </Link>
              </div>
            </div>
          </Col>
          <Col md={2}>
            {buildName &&
              <div>
                {subHeader('Latest build:')}
                <Link
                  style={{ textDecoration: 'none', color: buildStatus, textTransform: 'uppercase' }}
                  to={buildLink}
                >
                  {buildName}
                </Link>
                <div style={{ color: '#8c8c8c', fontSize: '12px' }}>{buildDate}</div>
              </div>
            }
          </Col>
          <Col md={1} style={{ float: 'right' }}>
            {showRemoveIcon &&
              <div
                onClick={this.handleRemoveClick}
                className="remove-icon"
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </div>
            }
          </Col>
        </Row>
      </ListGroupItem>
    )
  }
}

PullRequestListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  originLink: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  targetLink: PropTypes.string.isRequired,
  buildName: PropTypes.string,
  buildStatus: PropTypes.string,
  buildDate: PropTypes.string,
  buildLink: PropTypes.string,
  showRemoveIcon: PropTypes.bool,
  onRemoveClick: PropTypes.func,
}

export default PullRequestListItem
