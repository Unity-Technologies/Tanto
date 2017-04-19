/* @flow */

import {
  unifiedDiff,
  sideBySideDiff,
} from 'components/CodeDiffView/PrismCodeParser/PrismCodeParser'
import { setUnifiedDiff, setSideBySideDiff } from 'ducks/diff'
import { call, put } from 'redux-saga/effects'

export function* processUnifiedDiff(action: Object): Generator<any, any, any> {
  const processedDiff = yield call(unifiedDiff, action.diff, action.type)
  yield put(setUnifiedDiff(action.id, processedDiff))
}

export function* processSideBySideDiff(action: Object): Generator<any, any, any> {
  const processedDiff = yield call(sideBySideDiff, action.diff, action.type)
  yield put(setSideBySideDiff(action.id, processedDiff))
}
