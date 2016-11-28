/* @flow */

import 'isomorphic-fetch'
import { routes } from 'universal/constants'

import env from './config'
import { checkHttpStatus } from './universal/requests'


const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const User = require('./server/models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, res) => {
    done(err, res)
  })
})

passport.use('ono', new OAuth2Strategy({
  authorizationURL: env.ONO_AUTH_URL,
  tokenURL: env.ONO_AUTH_REQUEST_TOKEN_URL,
  clientID: env.ONO_OAUTH_CLIENT_ID,
  clientSecret: env.ONO_OAUTH_CLIENT_SECRET,
  callbackURL: routes.ONO_AUTH_CALLBACK_ROUTE,
  scope: 'openid',
  grant_type: 'authorization_code',
},
  (accessToken, refreshToken, profile, done) => {
    fetch(env.ONO_API_USERINFO, {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    })
    .then(checkHttpStatus)
    .then(response => response.json())
    .then((result) => {
      const user = {
        token: accessToken,
        id: result.sub,
        name: result.name,
        username: result.preferred_username,
        email: result.email,
      }
      User.save(user, (err, res) => {
        done(err, user)
      })
    })
    .catch((err) => {
      done(err, null)
    })
  }
))

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect(routes.LOGIN_ROUTE)
}
