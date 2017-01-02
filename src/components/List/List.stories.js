/* @flow */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import List from './index'

const items = [
  <div>Test item 1</div>,
  <div>Test item 2</div>,
  <div>Test item 3</div>,
  <div>Test item 4</div>,
]

storiesOf('List', module)
  .add('hidden pagination component', () => (
    <List
      pageSize={11}
      activePage={1}
      total={10}
    >
    {items.map(x => x)}
    </List>
  ))
  .add('visible pagination component', () => (
    <List
      pageSize={2}
      activePage={1}
      total={10}
    >
    {items.map(x => x)}
    </List>
  ))
  .add('next page', () => (
    <List
      pageSize={2}
      activePage={1}
      total={10}
      onPageSelect={action('onSelect')}
    >
    {items.map(x => x)}
    </List>
  ))
