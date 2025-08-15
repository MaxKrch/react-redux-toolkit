import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { List, UI } from '../types'
import { SLICE_NAMES } from '../consts'
import { removeList } from './lists-slice'

const initialState: UI = {
  activeListId: null,
}
const uiSlice = createSlice({
  name: SLICE_NAMES.UI,
  initialState,
  reducers: {
    setActiveList: (state, { payload }: PayloadAction<List['id'] | null>) => {
      if (state.activeListId !== payload) state.activeListId = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      removeList,
      (state, { payload }: PayloadAction<List['id']>) => {
        if (state.activeListId === payload) state.activeListId = null
      }
    )
  },
})

export const { setActiveList } = uiSlice.actions

export default uiSlice.reducer
