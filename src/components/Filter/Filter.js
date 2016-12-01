import Select from 'react-select'
import React, { Component, PropTypes } from 'react'
import 'react-select/dist/react-select.css'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = { value: null }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(r) {
    this.setState({
      value: r,
    })
    if (this.props.onChange) {
      this.props.onChange(r)
    }
  }

  render() {
    return (
      <div style={{ width: '170px' }}>
        <Select
          name="form-field-name"
          placeholder={this.props.placeholder}
          value={this.state.value}
          options={this.props.data}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

Filter.propTypes = {
  // project: PropTypes.string.isRequired,
  // defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  // style: PropTypes.object,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}

export default Filter
