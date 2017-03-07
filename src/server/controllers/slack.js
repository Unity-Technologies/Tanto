/* @flow */
/* eslint-disable */

import slack from 'slack'
import redis from '../redis'

const client = redis.client()

export const SLACK_USERS = 'SLACK_USERS'

/**
 * Prefetch user's SLACK id, email, time zone offset and avatar and save to redis
 */
export const prefetchSlackAvatars = () => {

  const env = require('server/config')
  slack.users.list({ token: env.SLACK_TOKEN }, (err, data) => {
    if (err) {
      throw err
    }
    if (data.ok) {
      const reducedProfiles =
        data.members.filter(x => !x.is_bot).map(x => ({
          id: x.id,
          avatar: x.profile.image_32,
          tz: x.tz_offset,
          email: x.profile.email,
        })
      )
      client.hmset(SLACK_USERS, ['data', JSON.stringify(reducedProfiles)])
    }
  })
}

export const scheduleSlackUserProfilesPrefetch = (rule: string) => {
  const schedule = require('node-schedule')
  // Prefetch once whenever process (re)started
  prefetchSlackAvatars()

  // Schedule recurrent prefetch
  schedule.scheduleJob(rule, prefetchSlackAvatars)
}

/**
 * It expects that users were prefetched already and cached to redis
 */
export const getSlackAvatars = (req: Object, res: Object, next: Function): any => {
  client.hgetall(SLACK_USERS, (err, results) => {
    if (err) {
      return next(err)
    }

    if (!results || !results.data) {
      return next(new Error("No users read from redis store ..."))
    }

    return res.json(JSON.parse(results.data || {}))
  })
}
