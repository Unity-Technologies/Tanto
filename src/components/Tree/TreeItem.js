/* @flow */

import React from 'react'
import _ from 'lodash'
import { ListItem } from 'material-ui/List'
import FolderClosedIcon from 'material-ui/svg-icons/file/folder'

export type Props = {
  item: Object,
  clickHandler: Function,
  childrenProp: string,
  primaryTextProp: string,
  secondaryTextProp: string,
  inset: number,
  valueProp: string,
  palette: {
    primary1Color: string,
  },
}

function TreeItem({
  item,
  childrenProp,
  primaryTextProp,
  secondaryTextProp,
  valueProp,
  clickHandler,
  inset,
  palette,
} : Props) {
  const primaryText = item[primaryTextProp]
  const secondaryText = secondaryTextProp ? item[secondaryTextProp] : ''
  const value = item[valueProp]
  const children = item[childrenProp]

  const listItemWithNestedStyle = {
    fontSize: '13px',
  }

  const listItemWithoutNestedStyle = {
    paddingLeft: `${inset}px`,
    fontSize: '13px',
  }

  return (
    <div>
      <ListItem
        nestedListStyle={{ paddingTop: 0, paddingBottom: 0 }}
        style={children ? listItemWithNestedStyle : listItemWithoutNestedStyle}
        value={value}
        leftIcon={children && !!children.length ?
          <FolderClosedIcon style={{ fill: palette.primary1Color }} /> :
            null}
        primaryText={
          children && !!children.length ?
            <div style={{ color: palette.primary1Color, fontWeight: 700 }}>
              {primaryText}
            </div>
          :
            <div style={{ paddingBottom: '15px' }}>
              <div style={{ float: 'left' }}>{primaryText}</div>
              <div style={{ float: 'right', fontSize: '12px', color: '#a2a2a2' }}>
                {secondaryText}
              </div>
            </div>
    }
        onTouchTap={!children ? () => { clickHandler(value) } : null}
        primaryTogglesNestedList={!!(children && children.length)}
        insetChildren
        nestedItems={
          children && !!children.length &&
          children.map(child =>
            <TreeItem
              key={_.uniqueId('_tree_item')}
              item={child}
              clickHandler={clickHandler}
              childrenProp={childrenProp}
              primaryTextProp={primaryTextProp}
              secondaryTextProp={secondaryTextProp}
              valueProp={valueProp}
              inset={inset + 30}
            />
        )
      }
      />
    </div>)
}

export default TreeItem
