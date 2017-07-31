import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import window from 'global/window'
import reduxLogger from 'redux-logger'
import user from './user'
import voucherHistory from './voucherHistory'
import voucherHistoryPagination from './voucherHistoryPagination'
import environment from './environment'
import codeFinder from './codeFinder'

const reducers = combineReducers({
  user,
  codeFinder,
  voucherHistory,
  voucherHistoryPagination,
  environment
})

export function initStore (initialState = {}, options) {
  const middleware = process.env.NODE_ENV === 'production'
    ? createProdMiddleware()
    : createDevMiddleware()

  const preloadState = {
    ...initialState,
    environment: {
      isServer: options.isServer
    }
  }

  return createStore(reducers, preloadState, middleware)
}

function createProdMiddleware () {
  return applyMiddleware(thunkMiddleware)
}

function createDevMiddleware () {
  let middleware = applyMiddleware(
    thunkMiddleware,
    reduxLogger
  )

  if (window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension())
  }

  return middleware
}
