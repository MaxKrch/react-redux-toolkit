import type { Middleware } from 'redux'
import type { STATE_TYPE } from './types'

export const logger: Middleware<{}, STATE_TYPE> =
  (store) => (next) => (action) => {
    const result = next(action)

    console.log('Action: ', action)
    console.log('New state: ', store.getState())

    return result
  }
