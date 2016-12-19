/* @flow */

import React from 'react'
import { Link } from 'react-router'
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap'
import _ from 'lodash'

import './styles.css'

type LinkType = {
  link: string,
  label: string,
  active: boolean,
}

export type Props = {
  items: Array<LinkType>,
  style: Object,
  skip: number,
}

export const Breadcrumb = (props: Props) => {
  const { items, style, skip } = props
  if (skip > 0) {
    items.splice(0, skip)
  }
  items[items.length - 1].active = true
  return (
    <div>
      {items && items.length > 0 &&
        <BootstrapBreadcrumb style={style}>
          {items.map(item => (
            <BootstrapBreadcrumb.Item
              className={item.active ? 'active' : ''}
              key={_.uniqueId('breadcrumb_item')}
            >
             {!item.active ?
               <Link to={item.link}>{item.label}</Link> :
               <span>{item.label}</span>}
            </BootstrapBreadcrumb.Item>
          ))}
        </BootstrapBreadcrumb>
      }
    </div>
  )
}

export default Breadcrumb
