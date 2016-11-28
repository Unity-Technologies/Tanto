/* @flow */

import React, { Component, PropTypes } from 'react'

import './Checkbox.css'

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      checked: this.props.checked,
      disabled: this.props.disabled,
    }
    this.handleClick = this.handleClick.bind(this)
  }

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

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  onCheck: PropTypes.func,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Checkbox
