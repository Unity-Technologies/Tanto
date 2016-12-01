/* eslint-disable */

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)

class ProjectItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      followed: false,
    }
    this.toggleOpen = this.toggleOpen.bind(this)
    this.toggleFollow = this.toggleFollow.bind(this)
  }

  toggleOpen() {
    const value = this.state.open
    this.setState({ open: !value })
  }

  toggleFollow() {
    const value = this.state.followed
    this.setState({ followed: !value })
  }

  render() {
    const {
      item,
      childrenProp,
      primaryTextProp,
      secondaryTextProp,
      valueProp,
      clickHandler,
      inset,
    } = this.props

    const primaryText = item[primaryTextProp]
    const secondaryText = secondaryTextProp ? item[secondaryTextProp] : ''
    const value = item[valueProp]
    const children = item[childrenProp]

    const listItemWithNestedStyle = {
      fontSize: '13px',
    }

    const listItemWithoutNestedStyle = {
      paddingLeft: `${inset}px`,
      fontSize: '13px',
    }

    const innerDivStyle = {
      paddingTop: '10px',
      paddingBottom: '10px',
    }

    return (
      <div>
        <ListItem
          disableTouchRipple
          innerDivStyle={children && !!children.length ? null : innerDivStyle}
          nestedListStyle={{ paddingTop: 0, paddingBottom: 0 }}
          style={children ? listItemWithNestedStyle : listItemWithoutNestedStyle}
          value={value}
          onNestedListToggle={children ? this.toggleOpen : null}
          leftIcon={children && !!children.length ?
            <i style={{ fontSize: '20px' }} className={`fa ${this.state.open ? 'fa-folder-open-o' : 'fa-folder-o'}`} aria-hidden="true" /> : null}
          primaryText={
            children && !!children.length ?
              <div style={{ display: 'inline-block', width: '100%' }}>
                <div style={{ fontWeight: 700, float: 'left' }}>{primaryText}</div>
                <div style={{ marginRight: '50px', fontStyle: 'italic', fontSize: '12px', color: '#8a8a88', float: 'right' }}>{this.state.open ? '' : 'Project folder description goes here ...'}</div></div> :
                  <Row>
                    <Col md={5}>
                      <div>
                        <a onClick={() => { clickHandler(value) }}>{primaryText}</a>
                      </div>
                      <span style={{ fontStyle: 'italic', fontSize: '12px', color: '#8a8a88' }}>{secondaryText}</span>
                    </Col>
                    <Col md={3}>
                      {subHeader('Owner:')}
                      <div style={{ color: '#4e4a4a' }}>John Doe</div>
                    </Col>
                    <Col md={3}>
                      {subHeader('Last update:')}
                      <div style={{ color: '#4e4a4a' }}>2 hours ago, by <strong>John Doe</strong></div>
                    </Col>
                    <Col md={1}>
                      <div
                        style={{
                          fontSize: '20px',
                          float: 'right',
                          cursor: 'pointer',
                          color: this.state.followed ? 'rgb(37, 146, 106)' : '#aebac0' }}
                      >
                        <i
                          className="fa fa-rss"
                          onClick={this.toggleFollow}
                          aria-hidden="true"
                        />
                      </div>
                    </Col>
                  </Row>
      }
          primaryTogglesNestedList={!!(children && children.length)}
          insetChildren
          nestedItems={
            children && !!children.length &&
            children.map(child =>
              <ProjectItem
                key={_.uniqueId('_project_item')}
                item={child}
                clickHandler={clickHandler}
                childrenProp={childrenProp}
                primaryTextProp={primaryTextProp}
                secondaryTextProp={secondaryTextProp}
                valueProp={valueProp}
                inset={inset + 30}
              />
            )
          }
        />
        <Divider />
      </div>)
  }
}

ProjectItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
  childrenProp: PropTypes.string.isRequired,
  primaryTextProp: PropTypes.string.isRequired,
  secondaryTextProp: PropTypes.string,
  // updated: PropTypes.string,
  // owner: PropTypes.string,
  inset: PropTypes.number,
  valueProp: PropTypes.string.isRequired,
}

export default ProjectItem
