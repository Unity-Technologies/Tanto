/* @flow */

import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import _ from 'lodash'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { ListItem } from 'material-ui/List'
import Avatar from 'components/Avatar'
import PureComponent from 'components/PureComponent'
import { getLoggedUserAvatar, getLoggedUsername } from 'ducks/session/selectors'


import SelectableList from 'components/SelectableList'
import './SideBar.css'

const textColor = 'rgb(88, 89, 89)'

const listItem = (title, icon, badge, open) => (
  <div style={{ color: '#4574b5', fontSize: '20px' }}>
    <div style={{ display: 'inline-table', width: '40px', color: textColor, marginLeft: '5px' }}>
      <i className={`fa fa-${icon}`} aria-hidden="true" />
    </div>
    {open &&
      <span
        style={{
          fontSize: '13px',
          color: textColor,
          textTransform: 'uppercase',
          marginLeft: '10px',
        }}
      >
        {title}
      </span>
    }
    {badge &&
      <div
        className={`badge ${open ? 'badge-main-menu-open' : 'badge-main-menu-closed'}`}
      >{badge}</div>
    }
  </div>
)


export type Props = {
  width: number,
  hiddenWidth: number,
  items: Array<any>,
  subitems: Array<any>,
  open: boolean,
  sideBarMenuItemStyle?: Object,
  sideBarMenuItemSelectedStyle?: Object,
  dispatch: Function,
  defaultValue: number,
  title: string,
  avatar: string,
  username: string,
}

class SideBar extends PureComponent {
  props: Props
  redirect(to) {
    this.props.dispatch(push(to))
  }

  render() {
    const {
      items,
      avatar,
      username,
      open,
      width,
      hiddenWidth,
      defaultValue,
    } = this.props

    const drawerStyle = {
      backgroundColor: '#f2f2f2',
      boxShadow: 'none',
      overflow: 'hidden',
      borderRight: '1px solid rgba(60, 95, 144, 0.168627)',
    }

    return (
      <Drawer
        width={open ? width : hiddenWidth}
        containerStyle={drawerStyle}
      >
        <div>
          <Avatar avatar={avatar} style={{ margin: '15px', height: '30px', width: '30px' }} />
          {open && <div
            style={{
              float: 'left',
              fontSize: '16px',
              marginTop: '17px',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {username}
          </div>
          }
        </div>

        <div
          style={{
            marginTop: '50px',
            padding: '50px 0 30px 0',
          }}
        >

          <SelectableList defaultValue={defaultValue}>
            {items.map((item, index) =>
              <ListItem
                key={_.uniqueId('_sidebar_item')}
                value={index + 1}
                style={{ color: 'white' }}
                disableTouchRipple
                onClick={() => this.redirect(item.route)}
              >
                {listItem(item.title, item.icon, item.badge, open)}
              </ListItem>
            )}
          </SelectableList>
        </div>
      </Drawer>
    )
  }
}


export default connect(state => ({
  open: state.sidebar.open,
  items: state.sidebar.items || [],
  defaultValue: state.sidebar.selected,
  username: getLoggedUsername(state),
  avatar: getLoggedUserAvatar(state),
}))(SideBar)
