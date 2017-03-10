
import { schema } from 'normalizr'

const user = new schema.Entity('users')

const pullRequest = new schema.Entity('pullRequests')

const issue = new schema.Entity('issues', {
  owner: user,
  assignee: user,
})


const comment = new schema.Entity('comments', {
  author: user,
})

const changeset = new schema.Entity('changesets')

const repository = new schema.Entity('repositories', {
  owner: user,
  changelog: [changeset],
  changeset,
  pullRequests: {
    nodes: [pullRequest],
  },
})

const group = new schema.Entity('groups')

group.define({
  groups: {
    nodes: [group],
  },
  repositories: {
    nodes: [repository],
  },
})

const file = new schema.Entity('files', {
  comments: [comment],
})

pullRequest.define({
  owner: user,
  issues: [issue],
  files: [file],
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

export const tantoSchema = {
  users: [user],
  repository,
  changeset,
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
