/**
 *
 * index.js
 *
 * Entry point of the application
 */

import 'sanitize.css/sanitize.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './utils/history'

import reportWebVitals from './reportWebVitals'

// Import root app
import App from './containers/App'

import configureStore from './configureStore'

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)

const MOUNT_NODE = document.getElementById('root') || document.createElement('div')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals(console.log)
