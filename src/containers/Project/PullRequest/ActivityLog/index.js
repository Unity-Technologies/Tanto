/* @flow */

/* eslint-disable */

import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import { darkBlack, lightBlack } from 'material-ui/styles/colors'

function ActivityLog(props) {
  return (
    <List>
      <Subheader>Today</Subheader>
      <ListItem
        leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />}
        primaryText="New inline comment"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>Brendan Lim</span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        }
        secondaryTextLines={1}
      />
      <Divider inset />
      <ListItem
        leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />}
        primaryText="Pull request version updated"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>Scott, Jennifer commit</span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        }
        secondaryTextLines={1}
      />
      <Divider inset />
      <ListItem
        leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />}
        primaryText="New inline comment"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>Grace Ng</span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        }
        secondaryTextLines={1}
      />
      <Divider inset />
      <ListItem
        leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />}
        primaryText="Updated description"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}> by Kerem Suer</span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        }
        secondaryTextLines={1}
      />
      <Divider inset />
      <ListItem
        leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />}
        primaryText="Pull request status is changed"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}> by Raquel Parrado</span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        }
        secondaryTextLines={1}
      />
      <ListItem
        leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />}
        primaryText="Reviewers were updated"
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>by Raquel Parrado</span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
        }
        secondaryTextLines={1}
      />
    </List>
    )
}


export default ActivityLog
