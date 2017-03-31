/* @flow */

export const routes = {
  ONO_API_ROUTE: '/api/ono',
  ONO_AUTH_ROUTE: '/auth/ono',
  ONO_AUTH_CALLBACK_ROUTE: '/auth/ono/callback',
  ONO_AUTH_LOGOUT_ROUTE: '/auth/logout',
  LOGIN_ROUTE: '/login',
  SLACK_API_ROUTE: '/api/slack/users',
}

export const ChangesetStatus = {
  TEST: 'test',
  NEW: 'new',
  NOT_REVIEWED: 'NOT_REVIEWED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
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
export const CONFLUENCE_REVIEW_PAGE = 'https://confluence.hq.unity3d.com/display/DEV/Code+Reviews'
