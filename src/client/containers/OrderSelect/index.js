/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import type { DirectionType } from 'ducks/order'
import { DIRECTION } from 'ducks/order'
import Select from 'react-select'

type SelectItemType = {
  label: string,
  value: ?string,
}

type OrderProps = {
  options: Array<string>,
  onSelect: Function,
  defaultOption: string,
  onOrderChange: Function,
}

type SwitchButtonProps = {
  isSelected: boolean,
  onSelect: Function,
}

const SwitchOrderButton = (props: SwitchButtonProps) => (
  <div style={{ float: 'left', margin: '2px' }}>
    <a
      role="link"
      tabIndex={0}
      onClick={props.onSelect}
      className="btn"
      style={{
        color: 'white',
        backgroundColor: props.isSelected ? '#b9ebae' : 'lightgrey',
      }}
    >
      <i className="fa fa-sort-amount-asc" />
    </a>
  </div >
)

class OrderSelect extends PureComponent {
  constructor(props: OrderProps) {
    super(props)
    const defaultValue =
      { label: this.props.defaultOption || '' }
    this.state = { field: defaultValue, order: DIRECTION.DESC }
  }

  state: {
    field: Object,
    order: DirectionType
  }

  props: OrderProps

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

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Select
          clearable={false}
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
