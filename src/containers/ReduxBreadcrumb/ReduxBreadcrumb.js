/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Breadcrumb } from 'react-bootstrap'
import _ from 'lodash'

export type Props = {
  items: Array<any>,
  style: Object,
}

function ReduxBreadcrumb(props: Props) {
  const { items, style } = props
  return (
    <div>
    {items.length > 0 &&
      <Breadcrumb style={style}>
        {items.map(item => (
          <Breadcrumb.Item active key={_.uniqueId('breadcrumb_item')}>
            <Link to={item.link}>{item.label}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    }
    </div>
  )
}

export default connect(state => ({
  items: state.breadcrumb ? state.breadcrumb.items : [],
}))(ReduxBreadcrumb)
