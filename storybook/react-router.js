import React from 'react'
import { action } from '@kadira/storybook'

// Set the custom link component
module.exports.Link = class Link extends React.Component {
  handleClick(e) {
    e.preventDefault()
    const { to } = this.props
    action('Link')(to)
  }

  render() {
    const { children, style } = this.props

    return (
      <a
        style={style}
        href="#"
        onClick={(e) => this.handleClick(e)}
      >
        {children}
      </a>
    )
  }
}
