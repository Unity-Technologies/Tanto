/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import _ from 'lodash'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import NotificationsIconNone from 'material-ui/svg-icons/social/notifications-none'
import { connect } from 'react-redux'

export type Props = {
  count: number,
  isAuthenticated: boolean,
  messages: Array<{
    message: string,
  }>,
};

function KafkaBadge({ count, isAuthenticated, messages }: Props) {
  return (
    <div>
    {isAuthenticated && count > 0 &&
      <Badge
        badgeContent={count}
        secondary
        badgeStyle={{ top: 7, right: 10 }}
      >
        <IconMenu
          iconButtonElement={<IconButton><NotificationsIcon color={'#d6d6d6'} /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {messages.length > 0 && messages.reverse().map((value, index) =>
            <MenuItem
              key={_.uniqueId('_kafka_message_item')}
              value={index}
              primaryText={value.message}
              style={{ fontSize: '12px' }}
            />
            )}
        </IconMenu>
      </Badge>
    }
    {isAuthenticated && count === 0 &&
      <NotificationsIconNone style={{ marginTop: '6px' }} color={'#d6d6d6'} />
    }
    </div>
  )
}

export default connect(state => ({
  isAuthenticated: true,  // FIXME
  count: state.kafka.count || 0,
  messages: state.kafka.messages || [],
}))(KafkaBadge)
