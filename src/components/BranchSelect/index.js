import Select from 'react-select'
import React, { Component, PropTypes } from 'react'
import 'react-select/dist/react-select.css'
import './styles.css'

class BranchSelect extends Component {
  constructor(props) {
    super(props)
    this.state = { project: props.project, value: props.defaultValue }
    this.handleChange = this.handleChange.bind(this)
    this.renderValue = this.renderValue.bind(this)
  }

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

BranchSelect.propTypes = {
  project: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  branches: PropTypes.array.isRequired,
}

export default BranchSelect
