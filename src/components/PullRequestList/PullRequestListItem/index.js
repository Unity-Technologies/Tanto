import React, { PropTypes, Component } from 'react'
import { Col, Row, ListGroupItem } from 'react-bootstrap'
import { TestAvatar } from 'components'
import { Link } from 'react-router'
import { fromNow } from 'utils/datetime'

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
      originBranch,
      originLink,
      destBranch,
      destLink,
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
                  <strong>{username}</strong>, last updated {fromNow(updated)}
                </div>
              </div>
            </div>
          </Col>
          <Col md={2} >
            <div style={{ overflowWrap: 'break-word' }}>
              {subHeader('Origin:')}
              <div>
                <Link
                  style={{ textDecoration: 'none', color: '#5a6082' }}
                  to={originLink}
                >
                  {originBranch}
                </Link>
              </div>
            </div>
          </Col>
          <Col md={2} >
            <div>
              {subHeader('Target:')}
              <div style={{ overflowWrap: 'break-word' }}>
                <Link
                  style={{ textDecoration: 'none', color: '#5a6082' }}
                  to={destLink}
                >
                  {destBranch}
                </Link>
              </div>
            </div>
          </Col>
          <Col md={2}>
            {buildName &&
              <div style={{ overflowWrap: 'break-word' }}>
                {subHeader('Latest build:')}
                <Link
                  className={`build-${buildStatus}`}
                  style={{ textDecoration: 'none', textTransform: 'uppercase' }}
                  to={buildLink}
                >
                  {buildName}-{buildStatus}
                </Link>
                <div style={{ color: '#8c8c8c', fontSize: '12px' }}>{fromNow(buildDate)}</div>
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
  originRepository: PropTypes.string.isRequired,
  originBranch: PropTypes.string.isRequired,
  originLink: PropTypes.string.isRequired,
  destRepository: PropTypes.string.isRequired,
  destBranch: PropTypes.string.isRequired,
  destLink: PropTypes.string.isRequired,
  buildName: PropTypes.string,
  buildStatus: PropTypes.string,
  buildDate: PropTypes.string,
  buildLink: PropTypes.string,
  showRemoveIcon: PropTypes.bool,
  onRemoveClick: PropTypes.func,
}

export default PullRequestListItem
