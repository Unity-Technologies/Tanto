// TODO: add flow annotations

import React from 'react'
import PureComponent from 'components/PureComponent'
import TextField from 'material-ui/TextField'
import Search from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton'

class SearchBox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const toggle = this.state.visible

    this.setState({ visible: !toggle })
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <div style={{ float: 'left' }}>
          <IconButton
            disableTouchRipple
            onClick={this.handleClick}
          >
            <Search style={{ marginTop: '2px' }} />
          </IconButton>
        </div>
        {this.state.visible &&
          <TextField
            style={{ width: '100px' }}
            underlineShow={false}
            hintText="Search"
          />
        }
      </div>
    )
  }
}

export default SearchBox
