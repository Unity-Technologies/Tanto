/* eslint-disable */

import chai from 'chai'
import mockery from 'mockery'
import spies from 'chai-spies'

chai.use(spies)
const should = chai.should()
const expect = chai.expect

const noop = require('node-noop').noop

describe('slack controller', () => {

  beforeEach(() => mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
  }))
  afterEach(() => mockery.disable())

  const redisCache = {}
  const error = new Error('test error')
  const redisClientMock = {
    unref: noop,
    on: noop,
    quit: noop,
    hmset: (key, data) => {
      redisCache[key] = data[1]
    }
  }

  let cbEerror = null

  const redisMock = {
    createClient: () => redisClientMock
  }

  const expected = [
    {
      id: 'testSlackId',
      tz: -2800,
      avatar: 'test imagelink',
      email: 'tst@email.com'

    },
    {
      id: 'testSlackId2',
      tz: -2830,
      avatar: 'test2imagelink',
      email: 'tst2@email.com'

    },
    {
      id: 'testSlackId3',
      tz: -23800,
      avatar: 'test3imagelink',
      email: 'tst3@email.com'

    }
  ]

  const slackUsers = {
    ok: true,
    members: [
      {
        id: 'testSlackId',
        tz_offset: -2800,
        extraField: 'test2',
        profile: {
          image_32: 'test imagelink',
          email: 'tst@email.com'
        }
      },
      {
        id: 'testSlackId2',
        tz_offset: -2830,
        extraField: 'test3',
        profile: {
          image_32: 'test2imagelink',
          email: 'tst2@email.com'
        }
      },
      {
        id: 'testSlackId3',
        tz_offset: -23800,
        extraField: 'tes3',
        profile: {
          image_32: 'test3imagelink',
          email: 'tst3@email.com'
        }
      }
    ]
  }

  const slackMock = {
    users: {
      list: (obj, cb) => {
        cb(cbEerror, slackUsers)
      }
    }
  }

  const envMock = {
    SLACK_TOKEN: 'some slack tocken'
  }
  mockery.registerMock('redis', redisMock)
  mockery.registerMock('slack-proxy', slackMock)
  mockery.registerMock('server/config', envMock)

  it('prefetchSlackAvatars success', () => {
    cbEerror = null
    const prefetchSlackAvatars = require('../slack').prefetchSlackAvatars
    prefetchSlackAvatars()
    expect(JSON.parse(redisCache.SLACK_USERS)).to.eql(expected)
  })

  it('prefetchSlackAvatars error', () => {
    cbEerror = error
    const prefetchSlackAvatars = require('../slack').prefetchSlackAvatars
    expect(() => prefetchSlackAvatars()).not.to.throw(error)
  })
})

