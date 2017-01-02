/* eslint-disable no-param-reassign, no-console */

import Express from 'express'
import React from 'react'
import path from 'path'
import favicon from 'serve-favicon'
import chalk from 'chalk'
import ReactDOM from 'react-dom/server'
import compression from 'compression'
import session from 'express-session'
import errorHandler from 'errorhandler'
import logger from 'morgan'
import expressValidator from 'express-validator'
import expressStatusMonitor from 'express-status-monitor'
import proxy from 'http-proxy-middleware'
import lusca from 'lusca'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import expressPromise from 'express-promise'
import uuid from 'uuid'
import { routes } from 'universal/constants'
import Html from './pages/Html'
import Login from './pages/Login'
import passportConfig from './passport'
import env from './config'

const app = new Express()

const RedisStore = require('connect-redis')(session)

const redisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  prefix: env.REDIS_SESSION_PREFIX,
}

const sessionOptions = {
  resave: true,
  saveUninitialized: true,
  secret: 'tes',
  genid: () => uuid.v4(),
  store: new RedisStore(redisOptions),
}

app.set('port', env.PORT)
app.use(expressStatusMonitor())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
app.use(compression())
app.use(logger('dev'))
app.use(expressValidator())
app.use(expressPromise())
app.use(Express.static(path.join(__dirname, '..', 'static')))
app.use(cookieParser(sessionOptions.secret))
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(lusca.nosniff())

app.get(routes.ONO_AUTH_ROUTE, passport.authenticate('ono'))
app.get(
  routes.ONO_AUTH_CALLBACK_ROUTE,
  passport.authenticate('ono', { failureRedirect: routes.LOGIN_ROUTE }),
  (req, res) => {
    req.session.user = req.user
    res.redirect(req.session.returnTo || '/')
  })

app.use(routes.ONO_AUTH_LOGOUT_ROUTE, (req, res) => {
  if (req.isAuthenticated()) {
    req.logout()
    req.session.destroy()
  }
  res.redirect(routes.LOGIN_ROUTE)
})

app.use(routes.LOGIN_ROUTE, (req, res) => {
  if (env.isDev) {
    webpackIsomorphicTools.refresh()
  }

  res.send(`<!doctype html>\n${ReactDOM.renderToString(
    <Login assets={webpackIsomorphicTools.assets()} />)}`)
})

const rewriteRouteRule = {}
rewriteRouteRule[`^${routes.ONO_API_ROUTE}`] = env.ONO_GRAPHQL_API_ROUTE

const options = {
  target: env.ONO_API_HOST,
  changeOrigin: true,
  ws: true,
  logLevel: env.isDev ? 'debug' : 'silent',
  pathRewrite: rewriteRouteRule,
  onError: (err, req, res) => {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    })
    res.end(err.message)
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', `Bearer ${req.user.token}`)
  },
}

const onoProxy = proxy(options)

app.use(routes.ONO_API_ROUTE, passportConfig.isAuthenticated, onoProxy)

app.use('/', passportConfig.isAuthenticated, (req, res) => {
  if (env.isDev) {
    webpackIsomorphicTools.refresh()
  }

  res.send(`<!doctype html>\n${ReactDOM.renderToString(
    <Html assets={webpackIsomorphicTools.assets()} />)}`)
})

app.use(errorHandler())

app.listen(app.get('port'), () => {
  console.log(
    '%s Express server listening on port %d in %s mode.',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  )
})
