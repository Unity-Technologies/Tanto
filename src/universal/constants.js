/* @flow */

export const routes = {
  ONO_API_ROUTE: '/api/ono',
  ONO_AUTH_ROUTE: '/auth/ono',
  ONO_AUTH_CALLBACK_ROUTE: '/auth/ono/callback',
  ONO_AUTH_LOGOUT_ROUTE: '/auth/logout',
  LOGIN_ROUTE: '/login',
}

export const ChangesetStatus = {
  TEST: 'test',
  NEW: 'new',
  NOT_REVIEWED: 'not_reviewed',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const IssueStatus = {
  NONE: 'none',
  NOW: 'now',
  LATER: 'later',
  AVAILABLE: 'available',
  OBSOLETE: 'obsolete',
  NEXT: 'next',
  CONFIRMED: 'confirmed',
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

/**
 * Available user personas (for testing purposes only !!!)
 */
export const DEVELOPER_PERSONA = 'DEVELOPER_PERSONA'
export const GUARDIAN_PERSONA = 'GUARDIAN_PERSONA'

