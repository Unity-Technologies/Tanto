import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  customWidth: {
    width: 150,
  },
}

export default class SelectFieldExampleSimple extends React.Component {
  constructor(props: Props) {
    super(props)
    this.state = { value: 1 }
    this.handleChange = this.handleChange.bind(this)
  }

  props: Props;

  handleChange(event, index, value) { return this.setState({ value }) }

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
        <br />
        <SelectField value={1} disabled>
          <MenuItem value={1} primaryText="Disabled" />
          <MenuItem value={2} primaryText="Every Night" />
        </SelectField>
        <br />
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
          <MenuItem value={1} primaryText="Custom width" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
        <br />
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth
        >
          <MenuItem value={1} primaryText="Auto width" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
      </div>
    )
  }
}
