/* @flow */

export const routes = {
  ONO_API_ROUTE: '/api/ono',
  ONO_AUTH_ROUTE: '/auth/ono',
  ONO_AUTH_CALLBACK_ROUTE: '/auth/ono/callback',
  ONO_AUTH_LOGOUT_ROUTE: '/auth/logout',
  LOGIN_ROUTE: '/login',
}

export const general = {
  TEST: 'test',
  PR_NEW: 'new',
  PR_NOT_REVIEWED: 'not_reviewed',
  PR_UNDER_REVIEW: 'under_review',
  PR_APPROVED: 'approved',
  PR_REJECTED: 'rejected',
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

export const PullRequestOrderFields = ['updated']

/**
 * Available user personas (for testing purposes only !!!)
 */
export const USER_PERSONA = 'USER_PERSONA'
export const DEVELOPER_PERSONA = 'DEVELOPER_PERSONA'
export const MANAGER_PERSONA = 'MANAGER_PERSONA'
export const GUARDIAN_PERSONA = 'GUARDIAN_PERSONA'

export default general
