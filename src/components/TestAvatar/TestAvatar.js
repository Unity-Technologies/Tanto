/* eslint-disable */

import React, { PropTypes, Component } from 'react'
import Avatar from 'material-ui/Avatar'

const randomNumber = (minA, maxA) => {
  const min = Math.ceil(minA)
  const max = Math.floor(maxA)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class TestAvatar extends Component {
  constructor(props) {
    super(props)
    this.state = { image: require(`../../media/images/avatars/Avatar${randomNumber(1, 3)}.png`) }
  }

  render() {
    const { style } = this.props
    return (
      <Avatar src={this.state.image} size={40} style={{ borderRadius: '20%', float: 'left', display: 'table-column', ...style }} />
    )
  }
}

TestAvatar.propTypes = {
  style: PropTypes.object,
}

export default TestAvatar
