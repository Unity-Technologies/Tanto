/* @flow */

import { call } from 'redux-saga/effects'
import { getSlackAvatars } from 'universal/services/slack'
import { fetchSaga, normalizeSaga } from 'sagas/fetch'

export function* fetchUsers(action: Object): Generator<any, any, any> {
  const response = yield call(fetchSaga, action.type, action.query, action.variables)
  const avatars = yield call(getSlackAvatars)

  const avatarsByEmails = {}
  avatars.reduce((acc, cur, i) => {
    avatarsByEmails[cur.email] = cur
    return avatarsByEmails
  }, {})
  const usersResponse = (response.data || response)
  const users = usersResponse.users.nodes || usersResponse.users
  const data = {
    users: users.map(
      user => ({ ...user, slack: avatarsByEmails[user.email] || {} })),
  }
  yield call(normalizeSaga, data)
}
