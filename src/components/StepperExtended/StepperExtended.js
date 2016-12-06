import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import {
  Step,
  Stepper,
  StepButton,
  StepLabel,
} from 'material-ui/Stepper'

export type Props = { items?: Array<any> };

class StepperExtended extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      stepIndex: this.props.items.length - 1,
    }
  }

  props: Props;

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


export default StepperExtended
