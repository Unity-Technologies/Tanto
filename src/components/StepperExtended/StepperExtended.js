/* @flow */

import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import {
  Step,
  Stepper,
  StepButton,
  StepLabel,
} from 'material-ui/Stepper'

class StepperExtended extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: this.props.items.length - 1,
    }
  }

  render() {
    return (
      <Stepper
        linear={false}
        activeStep={this.state.stepIndex}
        disableTouchRipple
      >
        {this.props.items.map((item, index) => (
          <Step key={_.uniqueId('_step')}>
            <StepButton
              disableTouchRipple
              onClick={() => this.setState({ stepIndex: index })}
            >
              <StepLabel style={{ fontSize: '11px' }}>{item}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    )
  }
}


StepperExtended.propTypes = {
  items: PropTypes.array,
}

export default StepperExtended
