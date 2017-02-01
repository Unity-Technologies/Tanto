import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'

import { fetchProfile } from 'ducks/session/actions'
import { fetchUsers } from 'ducks/users'

import App from 'pages/App'
import Home from 'pages/Home'
import Projects from 'pages/Projects'
import PullRequests from 'pages/PullRequests'
import File from 'pages/Project/File'
import Files from 'pages/Project/Files'
import Project from 'pages/Project/Project'
import Changelog from 'pages/Project/Changelog'
import Overview from 'pages/Project/Overview'
import Changeset from 'pages/Project/Changeset'
import ProjectPullRequests from 'pages/Project/PullRequests'
import Issues from 'pages/Project/Issues'
import PullRequest from 'pages/Project/PullRequest'
import NewPullRequest from 'pages/Project/NewPullRequest'


import { app, project, pullrequest, changeset } from 'containers/SideBar/SideBarConfig'

// import { normalize } from 'normalizr'
// import schema from 'ducks/ono/schema'


// const data = {
//   data: {
//     pullRequest: {
//       'id': 2,
//       revisions: [
//         'db44c4f8399f01e5d94c2dc608ddbf5bdbe256e7',
//         '8f745f03f2eacf942dbcc20b4e605fd5dba48a35',
//         'bc14d578b6f52171ab6571dfc6d8e18c398d83a1',
//       ],
//       reviews: [
//         {
//           user: {
//             'id': 4,
//             username: 'kate3',
//           },
//         },
//         {
//           user: {
//             id: 2,
//             'username': 'kate',
//           },
//         },
//         {
//           user: {
//             id: 3,
//             username: 'kate2',
//           },
//         },
//       ],
//       issues: [
//         {
//           id: 7,
//           'title': 'fghdfhgdfhg',
//           'description': '',
//           owner: {
//             id: 2,
//             'username': 'kate',
//           },
//           'assignee': {
//             'id': 2,
//             'username': 'kate',
//           },
//         },
//         {
//           'id': 8,
//           title: 'mn,.,m.,m.,m.,m.,m.,m.,m.,m.,',
//           description: '',
//           'owner': {
//             id: 2,
//             username: 'kate',
//           },
//           assignee: {
//             id: 2,
//             'username': 'kate',
//           },
//         },
//         {
//           'id': 9,
//           'title': 'Fix later',
//           description: '',
//           owner: {
//             'id': 2,
//             'username': 'kate',
//           },
//           assignee: {
//             id: 2,
//             username: 'kate',
//           },
//         },
//         {
//           'id': 10,
//           title: 'Fix in this PR',
//           description: '',
//           owner: {
//             'id': 2,
//             'username': 'kate',
//           },
//           'assignee': {
//             id: 2,
//             username: 'kate',
//           },
//         },
//         {
//           id: 11,
//           title: 'Fix in next PR',
//           description: '',
//           owner: {
//             id: 2,
//             username: 'kate',
//           },
//           assignee: {
//             'id': 2,
//             username: 'kate',
//           },
//         },
//         {
//           'id': 12,
//           title: 'Pre approve fix',
//           description: '',
//           'owner': {
//             'id': 2,
//             'username': 'kate',
//           },
//           'assignee': {
//             id: 2,
//             'username': 'kate',
//           },
//         },
//         {
//           id: 13,
//           'title': 'Fix in next pre approve',
//           'description': '',
//           'owner': {
//             id: 2,
//             'username': 'kate',
//           },
//           'assignee': {
//             'id': 2,
//             username: 'kate',
//           },
//         },
//         {
//           'id': 14,
//           title: 'fix some issues',
//           description: '',
//           owner: {
//             'id': 2,
//             'username': 'kate',
//           },
//           assignee: {
//             'id': 2,
//             username: 'kate',
//           },
//         },
//       ],
//       files: [
//         {
//           'id': 'C--b284a28710cc',
//           'name': 'test.py',
//           diff: "diff --git a/test.py b/test.py\n--- a/test.py\n+++ b/test.py\n@@ -22,12 +22,14 @@ class Page(object):\n         self.offset = offset\n         self.total = len(list(query))\n \n-        if self.limit > 0:\n-            query = query.limit(self.limit)\n+        if self.limit > 0:            query = query.limit(self.limit)\n         if self.offset >= 0:\n+            query = query.offset(selfset)\n+elf.offset >= 0:\n             query = query.offset(self.offset)\n \n         self.nodes = list(query.all())\n+        self.nodes = list(query.all())\n \n \n class Paging(graphene.Interface):\n@@ -75,6 +77,11 @@ class PullRequestSourceType(graphene.Enu\n     BRANCH = 'branch'\n     REVISION = 'rev'\n \n+class PullRequestOrigin(graphene.ObjectType):\n+    repository = graphene.Field(lambda: Repository)\n+    type = graphene.Field(lambda: PullRequestSourceType)\n+    revision = graphene.String()\n+    name = graphene.String()\n \n class PullRequestTarget(graphene.ObjectType):\n     repository = graphene.Field(lambda: Repository)\n@@ -82,13 +89,6 @@ class PullRequestTarget(graphene.ObjectT\n     name = graphene.String()\n \n \n-class PullRequestOrigin(graphene.ObjectType):\n-    repository = graphene.Field(lambda: Repository)\n-    type = graphene.Field(lambda: PullRequestSourceType)\n-    revision = graphene.String()\n-    name = graphene.String()\n-\n-\n class PullRequestSourceReference(graphene.InputObjectType):\n     type = graphene.String()\n     name = graphene.String()\n",
//           comments: [
//             {
//               'id': 18,
//               lineNumber: 'n85',
//               text: 'Some test inline comment',
//               author: {
//                 id: 2,
//                 'username': 'kate',
//               },
//             },
//           ],
//         },
//       ],
//     },
//   },
// }

// const testNorm = () => {
//   console.log(normalize(data.data, schema))
// }

export const initialPrefetch = (store) => {
  store.dispatch(store.dispatch(fetchProfile()))
  store.dispatch(store.dispatch(fetchUsers()))
}

export default (store) => {
  initialPrefetch(store)
  // testNorm()

  const onAppEnter = () => {
    app(store)
  }
  const onProjectEnter = (nextState) => {
    project(store, nextState.params.splat)
  }

  const onPullRequestEnter = (nextState) => {
    pullrequest(store, nextState.params.splat, nextState.params.prid)
  }

  const onChangesetEnter = (nextState) => {
    changeset(store, nextState.params.id, nextState.params.prid)
  }

  return (
    <Route path="/" component={App} >
      <Route onEnter={onAppEnter} >
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/pullrequests" component={PullRequests} />
        <Route path="/projects(/**)" component={Projects} />
      </Route>

      <Route onEnter={onProjectEnter}>
        <Route path="/project" component={Project}>
          <IndexRoute component={Overview} />
          <Route path="**/files/(**/)*.*" component={File} />
          <Route path="**/files(/**)" component={Files} />
          <Route path="**/changelog" component={Changelog} />
          <Route path="**/pullrequests" component={ProjectPullRequests} />

          <Route onEnter={onPullRequestEnter}>
            <Route path="**/pullrequest/:prid(/:category)" component={PullRequest} />
          </Route>
          <Route onEnter={onChangesetEnter}>
            <Route path="**/changeset/:hash" component={Changeset} />
          </Route>
          <Route path="**/issues" component={Issues} />
          <Route path="**/newpullrequest" component={NewPullRequest} />
          <Route path="**" component={Overview} />
        </Route>
      </Route>
    </Route>
  )
}
