/* @flow */

export const routes = {
  ONO_API_ROUTE: '/api/ono',
  ONO_AUTH_ROUTE: '/auth/ono',
  ONO_AUTH_CALLBACK_ROUTE: '/auth/ono/callback',
  ONO_AUTH_LOGOUT_ROUTE: '/auth/logout',
  LOGIN_ROUTE: '/login',
  SLACK_API_ROUTE: '/api/slack/users',
  BFSTATS_API_ROUTE: '/api/bfstats',
}

export const ChangesetStatus = {
  TEST: 'test',
  NEW: 'new',
  NONE: 'none',
  NOT_REVIEWED: 'NOT_REVIEWED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
}

export const IssueStatus = {
  NONE: 'none',
  OBSOLETE: 'OBSOLETE',
  FIX_LATER: 'FIX_LATER',
  FIX_NEXT_PR: 'FIX_NEXT_PR',
  FIX_NOW: 'FIX_NOW',
  FIX_AVAILABLE: 'FIX_AVAILABLE',
  FIX_CONFIRMED: 'FIX_CONFIRMED',
}

export const IssueStatusText = {
  NONE: 'No issue',
  FIX_NOW: 'Fix in this PR',
  FIX_LATER: 'Can fix later',
  FIX_AVAILABLE: 'Fix submitted',
  OBSOLETE: 'obsolete',
  FIX_NEXT_PR: 'Fix in next PR',
  FIX_CONFIRMED: 'Fix confirmed',
}


export const PullRequestSource = {
  BRANCH: 'BRANCH',
  REVISION: 'REVISION',
  TAG: 'TAG',
  BOOK: 'BOOK',
}


export const PullRequestOrderFields = {
  UPDATED: 'UPDATED',
  CREATED: 'CREATED',
}


export const BuildsResult = {
  [0]: 'SUCCESS',
  [1]: 'WARNINGS',
  [2]: 'FAILURE',
  [3]: 'SKIPPED',
  [4]: 'EXCEPTION',
  [5]: 'RETRY',
  [6]: 'CANCELED',
  [7]: 'NOT REBUILT',
  [8]: 'DEPENDENCY FAILURE',
  [9]: 'RESUME',
  [10]: 'MERGED',
  [11]: 'INTERRUPTED',
}

/**
 * Available user personas (for testing purposes only !!!)
 */
export const DEVELOPER_PERSONA = 'DEVELOPER_PERSONA'
export const GUARDIAN_PERSONA = 'GUARDIAN_PERSONA'
export const CONFLUENCE_REVIEW_PAGE = 'https://confluence.hq.unity3d.com/display/DEV/Code+Reviews'

export const DiffTypes = {
  UNIFIED: 0,
  SIDE_BY_SIDE: 1,
  RAW: 2,
}
