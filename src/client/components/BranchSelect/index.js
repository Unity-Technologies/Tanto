// TODO: finish flow annotation

import { default as Select } from 'components/VirtualizedSelect'
import React, { Component } from 'react'
import './styles.css'

export type Props = {
  project: string,
  defaultValue?: string,
  onChange?: Function,
  prefix?: string,
  disabled?: boolean,
  placeholder?: string,
  branches: Array<any>,
}

class BranchSelect extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { project: props.project, value: props.defaultValue }
    this.handleChange = this.handleChange.bind(this)
    this.renderValue = this.renderValue.bind(this)
  }

  props: Props

  handleChange(value) {
    this.setState({
      value,
    })

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  renderValue(option) {
    return <span>{this.props.prefix || 'branch:'} <strong>{option.label}</strong></span>
  }

  render() {
    const { disabled, placeholder, branches } = this.props
    return (
      <div>
        <Select
          name="form-field-name"
          value={this.state.value}
          placeholder={placeholder}
          disabled={disabled}
          options={branches}
          onChange={this.handleChange}
          valueRenderer={this.renderValue}
        />
      </div>
    )
  }
}

export default BranchSelect
