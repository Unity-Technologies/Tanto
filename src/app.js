import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import FontFaceObserver from 'fontfaceobserver'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import configureStore from './store'
import routes from './routes'
import styles from './containers/App/styles.css'

const initialState = window.INITIAL_STATE || {}
const newBrowserHistory = useScroll(() => browserHistory)()
const store = configureStore(initialState, newBrowserHistory)
const history = syncHistoryWithStore(newBrowserHistory, store)

const openSansObserver = new FontFaceObserver('Open Sans', {})

openSansObserver.load().then(() => {
  document.body.classList.add(styles.fontLoaded)
}, () => {
  document.body.classList.remove(styles.fontLoaded)
})

// Temporary material UI event plugin
injectTapEventPlugin()

const devTools = () => {
  if (__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('containers/DevTools') // eslint-disable-line global-require
    return <DevTools />
  }
  return false
}

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <Router routes={routes(store)} history={history} />
      {devTools()}
    </div>
  </Provider>, document.getElementById('root')
)
