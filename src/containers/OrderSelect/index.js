/* @flow */

import React, { Component } from 'react'
import type { DirectionType } from 'ducks/order'
import { DIRECTION } from 'ducks/order'
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

type SwitchButtonProps = {
  label: string,
  isSelected: boolean,
  onSelect: Function,
}

const SwitchOrderButton = (props: SwitchButtonProps) => (
  <div style={{ float: 'left', margin: '2px' }}>
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
    this.state = { field: null, order: DIRECTION.ASC }
  }

  handleFieldChange = (field: SelectItemType): void => {
    this.setState({ field })
    if (this.props.onSelect) {
      this.props.onSelect(field ? field.value : '')
    }
  }

  handleOrderChange = (order: DirectionType): void => {
    this.setState({ order })
    if (this.props.onOrderChange) {
      this.props.onOrderChange(order)
    }
  }

  handleAscClick = () => this.handleOrderChange(DIRECTION.ASC)
  handleDescClick = () => this.handleOrderChange(DIRECTION.DESC)

  props: OrderProps
  state: {
    field: ?SelectItemType,
    order: DirectionType
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Select
          value={this.state.field}
          name="branch"
          style={{ float: 'left', minWidth: '180px', width: '70%', marginRight: '3px' }}
          options={this.props.options.map(x => ({ label: x, value: x }))}
          onChange={this.handleFieldChange}
          placeholder="fields ..."
        />
        <SwitchOrderButton
          label="Sort ascending"
          isSelected={this.state.order === DIRECTION.ASC}
          onSelect={this.handleAscClick}
        />
        <SwitchOrderButton
          label="Sort descending"
          isSelected={this.state.order === DIRECTION.DESC}
          onSelect={this.handleDescClick}
        />
      </div>
    )
  }
}

export default OrderSelect
