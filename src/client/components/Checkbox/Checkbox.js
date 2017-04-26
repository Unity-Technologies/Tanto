/* @flow */

import React, { Component } from 'react'

import './Checkbox.css'

export type Props = {
  checked: boolean,
  value: any,
  onChange?: (e: SyntheticInputEvent) => any,
  name: string,
  disabled?: boolean,
  style?: any,
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
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  // TODO: apply material-ui  styling here
  render() {
    const { value, disabled, name, style } = this.props

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
          style={{ ...style }}
        />
        <label htmlFor={name} />
      </div>
    )
  }
}

export default Checkbox
