/* @flow */

import React, { Component } from 'react'

import './Checkbox.css'

export type Props = {
  checked: boolean,
  value: any,
  onChange?: (e: SyntheticInputEvent) => void,
  name: string,
  disabled?: boolean,
}

class Checkbox extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      checked: this.props.checked,
    }
  }

  state: {
    checked: boolean,
  }

  props: Props

  handleClick = (e: SyntheticInputEvent) => {
    this.setState({
      checked: e.target.checked,
    })
  }

  // TODO: apply material-ui  styling here
  render() {
    const { value, disabled, name } = this.props
    return (
      <div>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={this.state.checked}
          disabled={disabled}
          onChange={(this.props.onChange) ? this.handleClick : null}
          className="checkbox-box"
        />
        <label htmlFor={name} />
      </div>
    )
  }
}

export default Checkbox
