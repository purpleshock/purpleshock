import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import window from 'global/window'
import reduxLogger from 'redux-logger'
import user from './user'

const reducers = combineReducers({
  user
})

export function initStore () {
  const middleware = process.env.NODE_ENV === 'production'
    ? createProdMiddleware()
    : createDevMiddleware()

  return createStore(reducers, middleware)
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
