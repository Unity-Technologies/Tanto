
import { schema } from 'normalizr'

const user = new schema.Entity('users')

const pullRequest = new schema.Entity('pullRequests')

const issue = new schema.Entity('issues', {
  owner: user,
  assignee: user,
})

const comment = new schema.Entity('comments', {
  author: user,
  issue,
})

const file = new schema.Entity('files', {
  comments: [comment],
})

const changeset = new schema.Entity('changesets', {
  authorUser: user,
  files: [file],
  file,
})

const repository = new schema.Entity('repositories', {
  owner: user,
  changelog: {
    nodes: [changeset],
  },
  changeset,
  pullRequests: {
    nodes: [pullRequest],
  },
}, { idAttribute: 'fullName' })

const group = new schema.Entity('groups')

group.define({
  groups: {
    nodes: [group],
  },
  repositories: {
    nodes: [repository],
  },
})


pullRequest.define({
  owner: user,
  issues: [issue],
  files: [file],
  file,
  iterations: [pullRequest],
  changeset: [changeset],
  reviews: [{
    user,
  }],
  comments: [comment],
})

const profile = new schema.Entity('me', {
  pullRequestsOwned: {
    nodes: [pullRequest],
  },

  pullRequestsAssigned: {
    nodes: [pullRequest],
  },
})

/* BfStats responses */
const build = new schema.Entity('builds')

const sourceStamp = new schema.Entity('sourceStamps', {
  latestBuilds: {
    nodes: [build],
  },
  builds: {
    nodes: [build],
  },
}, { idAttribute: 'revision' })

export const tantoSchema = {
  users: [user],
  repository,
  changeset,
  comment,
  user,
  issue,
  build,
  sourceStamp,
  sourceStamps: [sourceStamp],
  pullRequest,
  group,
  groups: {
    nodes: [group],
  },
  pullRequests: [pullRequest],
  repositories: {
    nodes: [repository],
  },
  me: profile,
  changesets: [changeset],
}

export default tantoSchema
