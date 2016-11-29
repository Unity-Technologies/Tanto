/* @flow */

import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router'
import { darkBlack, grey400 } from 'material-ui/styles/colors'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Update from 'material-ui/svg-icons/action/system-update-alt'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { TestAvatar } from 'components'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'

const primaryTextStyle = {
  fontSize: '14px',
}

const secondaryTextStyle = {
  fontSize: '13px',
}
const iconButtonElement = (
  <IconButton
    touch
    tooltip="Menu"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)

function NotificationList() {
  return (
    <div>
      <List>
        <ListItem
          leftAvatar={<TestAvatar />}
          rightIconButton={rightIconMenu}
          primaryText={
            <div><div style={primaryTextStyle}>New comment in:
              <Link
                style={{
                  cursor: 'pointer',
                  fontWeight: '400',
                  paddingLeft: '10px',
                }}
                to="project/undefined/pullrequest/UHVsbFJlcXVlc3Q6Mw=="
              >
                Fixes for builds count controller, added new charts, fixed minor issues
              </Link>
              <span
                style={{
                  color: '#bcbbbb',
                  fontSize: '13px',
                  marginLeft: '10px' }}
              >
                3:54 pm
              </span>
            </div>
            </div>
          }
          secondaryText={
            <div style={secondaryTextStyle}>

              <span style={{ color: darkBlack }}>
                Brendan Lim
              </span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in

            </div>
          }
          secondaryTextLines={2}
        />
        <Divider inset />
        <ListItem
          rightIconButton={rightIconMenu}
          leftAvatar={
            <Avatar
              size={40}
              backgroundColor={'#d8e7f0'}
              style={{ borderRadius: '20%' }}
              icon={<ActionInfo />}
            />
          }
          primaryText={
            <p style={primaryTextStyle}>You are added as reviewer to:
              <Link
                style={{
                  cursor: 'pointer',
                  fontWeight: '400',
                  paddingLeft: '10px',
                }}
                to="project/undefined/pullrequest/UHVsbFJlcXVlc3Q6Mw=="
              >
                [5.4] Fix particle random number regression
              </Link>
              <span
                style={{
                  color: '#bcbbbb',
                  fontSize: '13px',
                  marginLeft: '10px' }}
              >
                7:54 pm
              </span> </p>
          }
          secondaryText={
            <p style={secondaryTextStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in

            </p>
          }
          secondaryTextLines={1}
        />
        <Divider inset />
        <ListItem
          rightIconButton={rightIconMenu}
          leftAvatar={
            <Avatar
              size={40}
              backgroundColor={'#f2dede'}
              style={{ borderRadius: '20%' }}
              icon={<Update />}
            />
          }
          primaryText={<p style={primaryTextStyle}>New pull request version:
            <Link
              style={{
                cursor: 'pointer',
                fontWeight: '400',
                paddingLeft: '10px',
              }}
              to="/project/UmVwb3NpdG9yeTox"
            >
              Option to use low resolution for Game View aspect ratios V4
            </Link>
            <span
              style={{
                color: '#bcbbbb',
                fontSize: '13px',
                marginLeft: '10px' }}
            >
              yesterday
            </span>
          </p>}
          secondaryText={
            <p style={secondaryTextStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          }
          secondaryTextLines={1}
        />
        <Divider inset />
        <ListItem
          rightIconButton={rightIconMenu}
          leftAvatar={
            <TestAvatar />
          }
          primaryText={
            <p style={primaryTextStyle}>You are mentioned in:
              <Link
                style={{
                  cursor: 'pointer',
                  fontWeight: '400',
                  paddingLeft: '10px',
                }}
                to="project/undefined/pullrequest/UHVsbFJlcXVlc3Q6Mw=="
              >
                Trunk merge of the scriptable renderloop branch
              </Link>
              <span
                style={{
                  color: '#bcbbbb',
                  fontSize: '13px',
                  marginLeft: '10px' }}
              >
                2 days ago
              </span>
            </p>
          }
          secondaryText={
            <p style={secondaryTextStyle}>
              <span style={{ color: darkBlack }}>
                John Dou
              </span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in

            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset />
        <ListItem
          rightIconButton={rightIconMenu}
          leftAvatar={
            <Avatar
              size={40}
              backgroundColor={'#d8e7f0'}
              style={{ borderRadius: '20%' }}
              icon={<ActionInfo />}
            />
          }
          primaryText={<p style={primaryTextStyle}>You are added as reviewer to:
            <Link
              style={{
                cursor: 'pointer',
                fontWeight: '400',
                paddingLeft: '10px',
              }}
              to="project/undefined/pullrequest/UHVsbFJlcXVlc3Q6Mw=="
            >
            Option to use low resolution for Game View aspect ratios
            </Link>
            <span
              style={{
                color: '#bcbbbb',
                fontSize: '13px',
                marginLeft: '10px' }}
            >
            4 days ago
            </span>
          </p>}
          secondaryText={
            <p style={secondaryTextStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          }
          secondaryTextLines={1}
        />
        <Divider inset />
        <ListItem
          rightIconButton={rightIconMenu}
          leftAvatar={
            <TestAvatar />
          }
          primaryText={
            <p style={primaryTextStyle}>New comment in:
              <Link
                style={{
                  cursor: 'pointer',
                  fontWeight: '400',
                  paddingLeft: '10px',
                }}
                to="project/undefined/pullrequest/UHVsbFJlcXVlc3Q6Mw=="
              >
                Move render target switching out from jobs
              </Link>
              <span
                style={{
                  color: '#bcbbbb',
                  fontSize: '13px',
                  marginLeft: '10px' }}
              >
                5 days ago
              </span>
            </p>
          }
          secondaryText={
            <p style={secondaryTextStyle}>
              <span style={{ color: darkBlack }}>
                John Dou
              </span> --
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in

            </p>
          }
          secondaryTextLines={2}
        />
      </List>
    </div>
  )
}

export default NotificationList
