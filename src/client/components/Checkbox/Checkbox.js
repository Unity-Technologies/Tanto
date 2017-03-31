/* @flow */

import React, { Component } from 'react'

import './Checkbox.css'

export type Props = {
  checked: boolean,
  value: any,
  onChange?: (e: SyntheticInputEvent) => any,
  name: string,
  disabled?: boolean,
}

class Checkbox extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      checked: this.props.checked,
      disabled: this.props.disabled ? this.props.disabled : false,
    }
  }

  state: {
    checked: boolean,
    disabled: boolean,
  }

  props: Props

  handleClick = (e: SyntheticInputEvent) => {
    this.setState({
      checked: e.target.checked,
    })
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  // TODO: apply material-ui  styling here
  render() {
    const { value, name } = this.props

    return (
      <div>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={this.state.checked}
          disabled={this.state.disabled}
          onChange={this.handleClick}
          className="checkbox-box"
        />
        <label htmlFor={name} />
      </div>
    )
  }
}

export default Checkbox
