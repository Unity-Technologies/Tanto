
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
  groups: [group],
  repositories: {
    nodes: [repository],
  },
})

pullRequest.define({
  owner: user,
  issues: [issue],
  files: [{
    comments: [comment],
  }],
  reviews: [{
    user,
  }],
  comments: [comment],
  origin: {
    repository,
  },
  target: {
    repository,
  },
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
  groups: [group],
  pullRequests: [pullRequest],
  repositories: {
    nodes: [repository],
  },
  me: profile,
  changesets: [changeset],
}

export default tantoSchema
