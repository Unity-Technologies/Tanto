import chai from 'chai'
import {
  computePullRequestLink,
  computePullRequestOriginLink,
  computePullRequestTargetLink,
  computePullRequest,
} from '../index'

const expect = chai.expect


describe('session selectors computations', () => {
  const pullrequest = {
    id: 'UHVsbFJlcXVlc3Q6MQ==',
    description: 'test description',
    title: 'Some test pull request',
    created: '2016-11-15 16:18:36.628901',
    updated: '2016-11-15 16:18:36.628916',
    status: 'new',
    owner: {
      username: 'test',
      email: 'test@test.tt',
      fullName: 'test test',
    },
    origin: {
      revision: 'd1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
      branch: 'graphics/gi/bugfix/staging',
      repository: {
        name: 'unity/unity',
      },
    },
    target: {
      branch: 'trunk',
      repository: {
        name: 'unity/unity',
      },
    },
  }

  it('computePullRequestLink', () => {
    const link = (name, id) => `/${name}/pullrequest/${id}`
    expect(computePullRequestLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      link: link(pullrequest.origin.name, pullrequest.id),
    })
  })

  it('computePullRequestOriginLink', () => {
    const link = (name, branch) => `/${name}?${branch}`
    expect(computePullRequestOriginLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      originLink: link(pullrequest.origin.name, pullrequest.origin.branch),
    })
  })

  it('computePullRequestTargetLink', () => {
    const link = (name, branch) => `/${name}?${branch}`
    expect(computePullRequestTargetLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      targetLink: link(pullrequest.target.name, pullrequest.target.branch),
    })
  })

  it('computePullRequest', () => {
    const fn1 = (name, branch) => `/${name}?${branch}`
    const fn2 = (name, id) => `/${name}/pullrequest/${id}`

    const computed = computePullRequest(pullrequest)(fn2)(fn1)
    expect(computed).to.be.eql({
      ...pullrequest,
      link: fn2(pullrequest.origin.name, pullrequest.id),
      targetLink: fn1(pullrequest.target.name, pullrequest.target.branch),
      originLink: fn1(pullrequest.origin.name, pullrequest.origin.branch),
    })
  })
})
