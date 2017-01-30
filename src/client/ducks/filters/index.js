/* @flow */

import type {
  PullRequestSourceReference,
} from 'universal/types'

import { PullRequestSource } from 'universal/constants'

const initialState = { name: '', type: PullRequestSource.BRANCH }

export const target =
  (state: PullRequestSourceReference = initialState, action: Object = {}):
    PullRequestSourceReference =>
    (action && action.target ? action.target : state)
