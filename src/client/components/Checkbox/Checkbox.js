/* @flow */

import React, { Component } from 'react'

import './Checkbox.css'

export type Props = {
  checked: boolean,
  value: any,
  onChange?: (e: SyntheticInputEvent, value: boolean) => any,
  name: string,
  disabled?: boolean,
}

type State = {
  checked: boolean,
}

class Checkbox extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      checked: (this.props.checked !== undefined) ? this.props.checked : false,
    }
  }

  state: State

  props: Props

  handleClick(e: SyntheticInputEvent) {
    if (this.props.onChange) {
      this.setState({
        checked: (e.target.checked === undefined) ? this.state.checked : e.target.checked,
      })
    }
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
          onChange={this.handleClick}
          className="checkbox-box"
        />
        <label htmlFor={name} />
      </div>
    )
  }
}

export default Checkbox
