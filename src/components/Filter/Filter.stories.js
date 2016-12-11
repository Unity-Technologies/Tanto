/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Filter from './Filter.js'

storiesOf('Filter', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Filter
      data={[
        { value: 'foo', label: 'Foo' },
        { value: 'bar', label: 'Bar' },
      ]}
      onChange={() => action('onChange')}
    />
  ))
  .add('with placeholder', () => (
    <Filter
      data={[
        { value: 'foo', label: 'Foo' },
        { value: 'bar', label: 'Bar' },
      ]}
      placeholder="Please select something..."
      onChange={() => action('onChange')}
    />
  ))
