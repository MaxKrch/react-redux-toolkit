import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { List } from '../types'
import { SLICE_NAMES } from '../consts'
import type { APP_STATE_TYPE } from '../store'

const listAdapter = createEntityAdapter<List>()
const initialState = listAdapter.getInitialState()

const listSlice = createSlice({
  name: SLICE_NAMES.LISTS,
  initialState,
  reducers: {
    addList: listAdapter.addOne,
    addLists: listAdapter.addMany,
    renameList: (
      state,
      { payload }: PayloadAction<{ id: string; title: string }>
    ) => {
      listAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          title: payload.title,
        },
      })
    },
    removeList: listAdapter.removeOne,
  },
})

export const listsSelectors = listAdapter.getSelectors(
  (state: APP_STATE_TYPE) => state.lists
)

export const { addList, addLists, renameList, removeList } = listSlice.actions

export default listSlice.reducer
