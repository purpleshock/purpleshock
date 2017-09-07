import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import document from 'global/document'
import * as mobx from 'mobx'
import { Provider } from 'mobx-react'
import axios from 'axios'
import * as stores from './stores'
import App from './App'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

axios.defaults.baseURL = process.env.AP

mobx.useStrict(!isProd)

ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
