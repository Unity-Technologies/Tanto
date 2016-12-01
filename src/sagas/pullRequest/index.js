/* @flow */

import { call, put } from 'redux-saga/effects'

import { actions } from 'ducks/pullRequest'
import PULL_REQUEST_QUERY, { parsers } from 'services/ono/queries/pullRequest'
import { get } from 'services/ono/api'

type Action = { type: string, id: number }

export default function* fetchPullRequest(action: Action): Generator<*, *, *> {
  try {
    const response = yield call(get, PULL_REQUEST_QUERY, { id: action.id })
    const pullRequest = parsers.pullRequestQuery(response)
    yield put(actions.fetchDone(pullRequest))
  } catch (error) {
    yield put(actions.fetchError(error))
  }
}
