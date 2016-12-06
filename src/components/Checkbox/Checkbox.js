// TODO: add flow annotation

import React, { Component } from 'react'

import './Checkbox.css'

export type Props = {
  value: string,
  onCheck?: Function,
  name: string,
  checked?: boolean,
  disabled?: boolean,
}

class Checkbox extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: this.props.value,
      checked: this.props.checked,
      disabled: this.props.disabled,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  props: Props

  handleClick(e) {
    this.setState({ checked: e.target.checked })
    if (this.props.onCheck) {
      this.props.onCheck(e, e.target.checked)
    }
  }

  // TODO: apply material-ui  styling here
  render() {
    const { value, checked, disabled } = this.state
    const { name } = this.props
    return (
      <div>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onClick={this.handleClick}
          className="checkbox-box"
        />
        <label htmlFor={name} />
      </div>
    )
  }
}

export default Checkbox
