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
import './containers/App/styles.css'

const initialState = window.INITIAL_STATE || {}
const newBrowserHistory = useScroll(() => browserHistory)()
const store = configureStore(initialState, newBrowserHistory)
const history = syncHistoryWithStore(newBrowserHistory, store)

const openSansObserver = new FontFaceObserver('Open Sans', {})

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
}, () => {
  document.body.classList.remove('fontLoaded')
})

// Temporary material UI event plugin
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router routes={routes(store)} history={history} />
  </Provider>, document.getElementById('root')
)
