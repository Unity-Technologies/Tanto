// /* eslint-disable max-len */
// /* eslint-disable import/no-extraneous-dependencies*/

// import { put, call } from 'redux-saga/effects'
// import { setPullRequests } from 'ducks/pullrequests'
// import { actions as sessionActions } from 'ducks/session'
// import fetchSaga from 'sagas/fetch'
// import {
//   queries,
//   parsers,
// } from 'services/ono/queries/pullrequests'

// import {
//     fetchPullRequests,
//     fetchCurrentUserPullRequests,
//     fetchCurrentUserAssignedPullRequests,
//     fetchCurrentUserWatchingPullRequests } from 'sagas/pullrequests'

// const expect = require('chai').expect

// describe('pullrequests saga', () => {
//   it('fetchPullRequests should fetch users pull requests', () => {
//     const query = 'test query'
//     const total = 12
//     const pullrequests = [{ id: 1, title: '1' }, { id: 2, title: '2' }]
//     const testResponse = { data: { me: { prs: { nodes: pullrequests, total } } } }
//     const parser = response => (response.data.me.prs)
//     const updateSession = prs => (prs)
//     const pageSize = 12
//     const page = 1
//     const branch = 'testbranch'
//     const repo = 'testrepo'
//     const orderBy = {
//       direction: 'ASC',
//       field: '',
//     }
//     const action = {
//       type: 'SOME_FETCH',
//       pageSize,
//       branch,
//       repo,
//       orderBy,
//       page,
//     }
//     const first = pageSize
//     const offset = pageSize * (page - 1)
//     const generator = fetchPullRequests(action, query, parser, updateSession)

//     expect(generator.next().value).to.deep.equal(call(fetchSaga, action.type, query, { first, offset, branch, repo, orderBy }))
//     expect(generator.next(testResponse).value).to.deep.equal(put(setPullRequests(page, pullrequests)))
//   })


//   it('fetchCurrentUserPullRequests should fetch current users pull requests', () => {
//     const action = {
//       pageSize: 12,
//       page: 2,
//     }

//     const generator = fetchCurrentUserPullRequests(action)
//     expect(generator.next().value).to.deep.equal(
//         call(fetchPullRequests,
//             action,
//             queries.CURRENT_USER_PULL_REQUESTS,
//             parsers.parseCurrentUserPullRequests,
//             sessionActions.setPullRequestsOwned))
//   })

//   it('fetchCurrentUserPullRequests should fetch current users assigned pull requests', () => {
//     const action = {
//       pageSize: 12,
//       page: 2,
//     }
//     const generator = fetchCurrentUserAssignedPullRequests(action)
//     expect(generator.next().value).to.deep.equal(
//         call(fetchPullRequests,
//             action,
//             queries.CURRENT_USER_ASSIGNED_PULL_REQUESTS,
//             parsers.parseCurrentUserAssignedPullRequests,
//             sessionActions.setPullRequestsAssigned))
//   })

//   it('fetchCurrentUserPullRequests should fetch current users watching pull requests', () => {
//     const action = {
//       pageSize: 12,
//       page: 2,
//     }
//     const generator = fetchCurrentUserWatchingPullRequests(action)
//     expect(generator.next().value).to.deep.equal(
//         call(fetchPullRequests,
//             action,
//             queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
//             parsers.parseCurrentUserWatchingPullRequests,
//             sessionActions.setPullRequestsWatching))
//   })
// })
