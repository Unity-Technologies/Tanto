/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import _ from 'lodash'

import SelectableList from './SelectableList.js'
import { ListItem } from 'material-ui/List'

const items = [{ title: 'test item 1' }, { title: 'test item 2' }, { title: 'test item 2' }]

const listItem = (title) => (
  <div style={{ color: '#4574b5', fontSize: '20px' }}>
    {open &&
      <span
        style={{
          fontSize: '13px',
          color: 'rgb(88, 89, 89)',
        }}
      >
        {title}
      </span>
    }
  </div>
)

storiesOf('SelectableList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <SelectableList defaultValue={2} >
    {items.map((item, index) =>
      <ListItem
        key={_.uniqueId('_sidebar_item')}
        value={index + 1}
        disableTouchRipple
        onClick={action('onClick')}
      >
        {listItem(item.title)}
      </ListItem>
    )}
    </SelectableList>
  ))
