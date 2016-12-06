import Select from 'react-select'
import React, { Component, PropTypes } from 'react'
import 'react-select/dist/react-select.css'

export type Props = {
  placeholder?: // project: PropTypes.string.isRequired,
  // defaultValue: PropTypes.string,
  string,
  data: // style: PropTypes.object,
  Array<any>,
  onChange?: Function,
};

class Filter extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { value: null }
    this.handleChange = this.handleChange.bind(this)
  }

  props: Props;

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

export default Filter
