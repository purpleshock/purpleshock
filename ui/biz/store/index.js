import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import window from 'global/window'
import user from './user'
import voucherAvailableStatus from './voucherAvailableStatus'
import voucherHistory from './voucherHistory'
import environment from './environment'
import codeFinder from './codeFinder'
import voucherActivity from './voucherActivity'

const reducers = combineReducers({
  user,
  codeFinder,
  voucherActivity,
  voucherAvailableStatus,
  voucherHistory,
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
  let middleware = applyMiddleware(thunkMiddleware)

  if (window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension())
  }

  return middleware
}
