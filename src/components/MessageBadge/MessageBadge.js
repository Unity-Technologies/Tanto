// TODO: add flow annotations
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import Message from 'material-ui/svg-icons/communication/message'
import { connect } from 'react-redux'
import { selectors } from 'ducks/auth'  // FIXME: not existing...

export type Props = {
  count: number,
  isAuthenticated: boolean,
}

function MessageBadge({ count, isAuthenticated }: Props) {
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

export default connect(state => ({
  isAuthenticated: selectors.isAuthenticated(state),
  count: state.chat.count || 0,
  messages: [],
}))(MessageBadge)
