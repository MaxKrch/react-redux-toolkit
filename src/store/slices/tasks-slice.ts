import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { Task } from '../types'
import { SLICE_NAMES } from '../consts'
import type { APP_STATE_TYPE } from '../store'
import { removeList } from './lists-slice'

const tasksAdapter = createEntityAdapter<Task>()
const initialState = tasksAdapter.getInitialState()

const tasksSlice = createSlice({
  name: SLICE_NAMES.TASKS,
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    addTasks: tasksAdapter.addMany,
    updateTask: (
      state,
      {
        payload,
      }: PayloadAction<{ id: Task[`id`]; description: Task['description'] }>
    ) => {
      tasksAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          description: payload.description,
        },
      })
    },
    toggleStatusTask: (state, { payload }: PayloadAction<Task['id']>) => {
      const task = state.entities[payload]
      if (!task) return

      tasksAdapter.updateOne(state, {
        id: payload,
        changes: {
          completed: !task.completed,
        },
      })
    },
    removeTask: tasksAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeList, (state, action) => {
      const listId = action.payload
      const idsToRemove = state.ids.filter(
        (id) => state.entities[id].listId === listId
      )

      tasksAdapter.removeMany(state, idsToRemove)
    })
  },
})

export const tasksSelectors = tasksAdapter.getSelectors(
  (state: APP_STATE_TYPE) => state.tasks
)

export const { addTask, addTasks, updateTask, toggleStatusTask, removeTask } =
  tasksSlice.actions

export default tasksSlice.reducer
