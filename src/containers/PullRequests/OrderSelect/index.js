/* @flow */

import React, { Component } from 'react'
import Select from 'react-select'


type SelectItemType = {
  label: string,
  value: string,
}

type OrderProps = {
  options: Array<string>,
  onSelect: Function,
  onOrderChange: Function,
}

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
}

type OrderType = ORDER.ASC | ORDER.DESC

type SwitchButtonProps = {
  label: string,
  order: string,
  state: string,
  onSelect: Function,
}

const SwitchOrderButton = (props: SwitchButtonProps) => (
  <div style={{ float: 'left', margin: '2px 5px' }}>
    <a
      onClick={props.onSelect}
      className="btn"
      style={{
        color: 'white',
        backgroundColor: props.isSelected ? '#b9ebae' : 'lightgrey',
      }} aria-label={props.label}
    >
      <i className="fa fa-sort-amount-asc" aria-hidden="true" />
    </a>
  </div >
  )

class OrderSelect extends Component {
  constructor(props: OrderProps) {
    super(props)
    this.state = { field: {}, order: ORDER.ASC }
  }

  componentWillReceiveProps(nextProp: any): void {
    this.setState({
      options: nextProp.options.map(x => ({ label: x, value: x })),
    })
  }

  handleFieldChange = (field: SelectItemType): void => {
    this.setState({ field })
    if (this.props.onSelect) {
      this.props.onSelect(field.value)
    }
  }

  handleOrderChange = (order: OrderType): void => {
    this.setState({ order })
    if (this.props.onOrderChange) {
      this.props.onOrderChange(order)
    }
  }

  handleAscClick = () => this.handleOrderChange(ORDER.ASC)
  handleDescClick = () => this.handleOrderChange(ORDER.DESC)

  props: OrderProps

  render() {
    return (
      <div>
        <Select
          value={this.state.field}
          name="branch"
          style={{ float: 'left', width: '70%' }}
          options={this.state.options}
          onChange={this.handleFieldChange}
          placeholder="fields ..."
        />
        <SwitchOrderButton
          label="Sort ascending"
          isSelected={this.state.order === ORDER.ASC}
          onSelect={this.handleAscClick}
        />
        <SwitchOrderButton
          label="Sort descending"
          isSelected={this.state.order === ORDER.DESC}
          onSelect={this.handleDescClick}
        />
      </div>
    )
  }
}

export default OrderSelect
