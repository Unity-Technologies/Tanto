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
  NEW: 'new',
  LATER: 'later',
  AVAILABLE: 'available',
  OBSOLETE: 'obsolete',
  NEXT: 'next',
}

export default general
