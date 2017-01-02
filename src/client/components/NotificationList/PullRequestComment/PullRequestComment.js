/* @flow */

import React from 'react'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router'
import { darkBlack } from 'material-ui/styles/colors'

import TestAvatar from '../../TestAvatar'

export type Props = {
  title?: string,
  author?: string,
  primaryTextStyle?: string,
  secondaryTextStyle?: string,
}

function PullRequestComment(props: Props) {
  return (
    <ListItem
      leftAvatar={
        <TestAvatar />
      }
      primaryText={
        <p style={props.primaryTextStyle}>Comment on:
          <Link
            style={{
              cursor: 'pointer',
              fontWeight: '400' }}
            to="project/undefined/pullrequest/UHVsbFJlcXVlc3Q6Mw=="
          >
            {props.title}
          </Link>
        </p>
      }
      secondaryText={
        <p style={props.secondaryTextStyle}>
          <span style={{ color: darkBlack }}>
            {props.author}
          </span> --
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in

        </p>
      }
      secondaryTextLines={2}
    />
  )
}

export default PullRequestComment
