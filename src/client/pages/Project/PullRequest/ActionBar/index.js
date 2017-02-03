/* @flow */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { setPersona } from 'ducks/session/actions'
import { connect } from 'react-redux'
import { getPersona } from 'ducks/session/selectors'

import {
  GUARDIAN_PERSONA,
  DEVELOPER_PERSONA,
} from 'universal/constants'

export type Props = {
  persona: string,
  dispatch: Function,
};

class ActionBar extends Component {
  props: Props

  changePersona(persona) {
    this.props.dispatch(setPersona(persona))
  }

  render() {
    const approveButtonStyle = {
      backgroundColor: '#1fb5ad',
      borderColor: '#1fb5ad',
      color: 'white',
    }

    const rejectButtonStyle = {
      backgroundColor: '#eea236',
      borderColor: '#eea236',
      color: 'white',
    }

    const { persona } = this.props

    return (
      <div style={{ margin: '10px' }}>
        <Row>
          <Col md={6} smHidden>
            <div style={{ float: 'left', padding: '5px', color: 'grey' }} >
              <i
                style={{ fontSize: '20px', padding: '2px', color: '#80c9e8' }}
                className="fa fa-exclamation-circle" aria-hidden="true"
              />
              <span><strong>  Jogn Dou</strong> just commented on line 123 </span>
            </div>
          </Col>
          <Col md={6} sm={12}>
            <ButtonGroup style={{ float: 'right' }}>
              <Button style={approveButtonStyle}>
                <i
                  style={{ color: 'white', fontSize: '14px' }}
                  className="fa fa-thumbs-up"
                  aria-hidden="true"
                />  Approve</Button>
              <Button style={rejectButtonStyle}>
                <i
                  style={{ color: 'white', fontSize: '14px' }}
                  className="fa fa-list" aria-hidden="true"
                />  Under review
              </Button>
              <DropdownButton
                pullRight
                style={{
                  color: 'white',
                  backgroundColor: 'rgb(188, 193, 195)',
                  borderColor: 'rgb(188, 193, 195)',
                }}
                title={<i className="fa fa-cog" aria-hidden="true" />}
                id="dropdown-button-pull-request-actions"
              >
                <MenuItem eventKey="1">Close</MenuItem>
                <MenuItem eventKey="2">Delete</MenuItem>
                <MenuItem eventKey="3">Create issue</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="1" onClick={() => this.changePersona(DEVELOPER_PERSONA)}>
                  <div style={{ display: 'inline-block' }}>
                    <div style={{ margin: '5px -9px', float: 'left' }}>
                      {persona === DEVELOPER_PERSONA &&
                        <i className="fa fa-check" aria-hidden="true" />
                      }
                    </div>
                    <div style={{ margin: '5px 15px' }}>Developer persona</div>
                  </div>
                </MenuItem>
                <MenuItem eventKey="2" onClick={() => this.changePersona(GUARDIAN_PERSONA)}>
                  <div style={{ display: 'inline-block' }}>
                    <div style={{ margin: '5px -9px', float: 'left' }}>
                      {persona === GUARDIAN_PERSONA &&
                        <i className="fa fa-check" aria-hidden="true" />
                      }
                    </div>
                    <div style={{ margin: '5px 15px' }}>Guardian persona</div>
                  </div>
                </MenuItem>
              </DropdownButton>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  persona: getPersona(state),
}))(ActionBar)
