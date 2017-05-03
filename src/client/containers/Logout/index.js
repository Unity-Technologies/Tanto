/* @flow */

import React from 'react'

import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'


/* @flow */
import More from 'material-ui/svg-icons/navigation/more-vert'

export type Props = {

  logoutRoute: string,
  dispatch: Function
}


function Logout(props: Props) {
  const { logoutRoute } = props
  return (
    <div>
      <IconMenu
        iconButtonElement={
          <IconButton style={{ height: '58px', width: '58px' }}>
            <More />
          </IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        menuStyle={{ border: '1px solid lightgrey' }}
      >
        <MenuItem disableTouchRipple value="2" primaryText="Sign out" href={logoutRoute} />
      </IconMenu>
    </div>
  )
}


export default Logout
