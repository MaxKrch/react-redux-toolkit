import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import { logger } from './middlewares'

const store = createStore(reducer, applyMiddleware(logger))

export type APP_STATE_TYPE = ReturnType<typeof store.getState>
export type APP_DISPATCH_TYPE = typeof store.dispatch

export default store
