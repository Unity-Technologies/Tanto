/* @flow */

import React from 'react'
import Helmet from 'react-helmet'

export type Props = {
  assets: {
    styles: Object,
    javascript: {
      main: string,
    },
  },
}

function Html({ assets }: Props) {
  const head = Helmet.rewind()

  const htmlStyle = {
    height: '100%',
  }
  const bodyStyle = {
    height: '100%',
    fontSize: '12px',
  }
  return (
    <html lang="en-US" style={htmlStyle}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {/* TODO: remove these links and store fonts to project */}
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
        <div id="root" />
        {Object.keys(assets.styles).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
        )}
        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  )
}

export default Html
