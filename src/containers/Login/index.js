/* @flow */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { routes } from 'universal/constants'

function ServerLogin() {
  const head = Helmet.rewind()

  const htmlStyle = {
    height: '100%',
  }
  const bodyStyle = {
    height: '100%',
    fontFamily: 'Lato',
    fontSize: 'medium',
    fontWeight: '400',
    color: '#4778bb',
    backgroundColor: 'rgb(238, 238, 240)',
  }

  const buttonStyle = {
    display: 'block',
    width: '215px',
    height: '25px',
    border: '1px solid #4778bb',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#4778bb',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const titleStyle = {
    marginBottom: '50px',
    textAlign: 'center',
    fontSize: '25px',
    textTransform: 'uppercase',
  }

  return (
    <html lang="en-US" style={htmlStyle}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta charSet="utf-8" />
        <meta
          httpEquiv="X-UA-Compatible"
          content="IE=edge"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Tanto description."
        />
        <meta
          name="keywords"
          content="Tanto"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
      </head>
      <body style={bodyStyle}>
        <div style={{ height: '33%' }} />
        <div>
          <div style={titleStyle}>
            <span> Welcome to Tanto</span>
          </div>
          <a style={buttonStyle} href={routes.ONO_AUTH_ROUTE}>
            <span style={{ verticalAlign: 'middle' }}>SIGN IN WITH ONO</span>
          </a>
        </div>
      </body>
    </html>
  )
}

ServerLogin.propTypes = {
  assets: PropTypes.object,
}

export default ServerLogin
