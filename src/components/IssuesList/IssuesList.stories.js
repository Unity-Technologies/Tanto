/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import IssuesList from './IssuesList.js'

const issues = [
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: 769,
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 2,
  },
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: 769,
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 1,
  }]

storiesOf('IssuesList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <IssuesList issues={issues} />
  ))
