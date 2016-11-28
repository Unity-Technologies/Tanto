/* @flow */

import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'

function NotificationSettingsMenu() {
  return (
    <div>
      <List>
        <Subheader>Notifications</Subheader>
        <ListItem
          primaryText="Events and reminders"
          rightToggle={<Toggle />}
        />
        <ListItem
          primaryText="Direct messages"
          rightToggle={<Toggle />}
        />
        <ListItem
          primaryText="Mentions"
          rightToggle={<Toggle />}
        />
      </List>
      <Divider />
      <List>
        <Subheader>Pull Request notifications</Subheader>
        <ListItem
          primaryText="Status change"
          rightToggle={<Toggle />}
        />
        <ListItem
          primaryText="Version update"
          rightToggle={<Toggle />}
        />
        <ListItem
          primaryText="Open or Close"
          rightToggle={<Toggle />}
        />
      </List>
    </div>
  )
}

export default NotificationSettingsMenu
