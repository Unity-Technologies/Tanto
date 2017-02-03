/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import IssuesList from './IssuesList.js'

const JohnDou = {
  id: '1',
  fullName: 'John Dou',
  username: 'johndou',
  email: 'johndou@john.do',
}

const JohnDoe = {
  id: '1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@john.do',
}

const issues = [
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: 769,
    owner: JohnDou,
    assignee: JohnDoe,
    status: 2,
  },
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: 769,
    owner: JohnDou,
    assignee: JohnDoe,
    status: 1,
  }]

storiesOf('IssuesList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <IssuesList issues={issues} />
  ))
