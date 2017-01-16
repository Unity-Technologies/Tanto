/* @flow */

import type {
  PullRequestSourceReference,
} from 'services/ono/queries/pullrequests'

import {
  PullRequestSource,
} from 'services/ono/queries/pullrequests'

const initialState = { name: '', type: PullRequestSource.BRANCH }

export const target =
  (state: PullRequestSourceReference = initialState, action: Object = {}):
    PullRequestSourceReference =>
    (action && action.target ? action.target : state)
