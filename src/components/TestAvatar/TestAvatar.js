// TODO: add flow annotations
/* eslint-disable */

import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'

const randomNumber = (minA, maxA) => {
  const min = Math.ceil(minA)
  const max = Math.floor(maxA)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export type Props = { style?: Object };

class TestAvatar extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { image: require(`../../media/images/avatars/Avatar${randomNumber(1, 3)}.png`) }
  }

  props: Props

  render() {
    const { style } = this.props
    return (
      <Avatar src={this.state.image} size={40} style={{ borderRadius: '20%', float: 'left', display: 'table-column', ...style }} />
    )
  }
}

export default TestAvatar
