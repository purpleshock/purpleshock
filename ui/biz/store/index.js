import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import window from 'global/window'
import reduxLogger from 'redux-logger'
import user from './user'
import voucherHistory from './voucherHistory'
import voucherHistoryPagination from './voucherHistoryPagination'

const reducers = combineReducers({
  user,
  voucherHistory,
  voucherHistoryPagination
})

export function initStore (initialState = {}) {
  const middleware = process.env.NODE_ENV === 'production'
    ? createProdMiddleware()
    : createDevMiddleware()

  return createStore(reducers, initialState, middleware)
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