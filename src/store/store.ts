import listReducer from './slices/lists-slice'
import taskReducer from './slices/tasks-slice'
import uiReducer from './slices/ui-slice'

import { logger } from './middlewares'
import { configureStore } from '@reduxjs/toolkit'
import { SLICE_NAMES } from './consts'

const store = configureStore({
  reducer: {
    [SLICE_NAMES.LISTS]: listReducer,
    [SLICE_NAMES.TASKS]: taskReducer,
    [SLICE_NAMES.UI]: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type APP_STATE_TYPE = ReturnType<typeof store.getState>
export type APP_DISPATCH_TYPE = typeof store.dispatch

export default store
