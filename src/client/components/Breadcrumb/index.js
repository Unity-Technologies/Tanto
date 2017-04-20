/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { default as BootstrapBreadcrumb } from 'react-bootstrap/lib/Breadcrumb'
import _ from 'lodash'

import './styles.css'

type LinkType = {
  link: string,
  label: string,
  active: boolean,
}

export const breadcrumbItems = (pathname: string, skip: number = 0): Array<LinkType> => {
  const items = pathname.split('/').filter(entry => entry.trim() !== '')
  let path = ''

  const routes = items.map(x => {
    path = path.concat('/', x)
    return { link: path, label: x, active: false }
  })

  if (routes.length > 0) {
    routes[routes.length - 1].active = true

    if (skip && skip > 0) {
      routes.splice(0, skip)
    }
  }
  return routes
}

export type Props = {
  path: string,
  skip?: number,
}

export class Breadcrumb extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { items: breadcrumbItems(props.path, props.skip) }
  }

  state: {
    items: Array<LinkType>,
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ items: breadcrumbItems(nextProps.path, nextProps.skip) })
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.path !== nextProps.path
  }

  props: Props

  render() {
    const { items } = this.state

    return (
      <div>
        {items && items.length > 0 &&
          <BootstrapBreadcrumb>
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
}

export default Breadcrumb
