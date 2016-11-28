/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import Message from 'material-ui/svg-icons/communication/message'
import { connect } from 'react-redux'
import { selectors } from 'ducks/auth'


function MessageBadge({ count, isAuthenticated }) {
  return (
    <div> {
      isAuthenticated &&
        <Badge
          badgeContent={count}
          primary
          style={{ paddingTop: '10px', paddingBottom: 0 }}
          badgeStyle={{ top: 7, right: 10 }}
        >
          <IconButton tooltip="Message notifications">
            <Message color={'#d6d6d6'} />
          </IconButton>
        </Badge>}
    </div>)
}

MessageBadge.propTypes = {
  count: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  //messages: PropTypes.array.isRequired,
}

export default connect(state => ({
  isAuthenticated: selectors.isAuthenticated(state),
  count: state.chat.count || 0,
  messages: [],
}))(MessageBadge)
