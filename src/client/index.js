import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import FontFaceObserver from 'fontfaceobserver'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from 'pages/App'
import './pages/App/styles.css'

const initialState = window.INITIAL_STATE || {}

const history = createHistory()
const store = configureStore(initialState, history)

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
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root')
)
