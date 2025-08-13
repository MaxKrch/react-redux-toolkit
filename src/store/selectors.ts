import type { Task } from '@/components/TaskItem'
import type { APP_STATE_TYPE } from './store'
import { createSelector } from 'reselect'

export const selectTasks = (state: APP_STATE_TYPE) => state.tasks

export const selectCompletedTasks = createSelector(
  selectTasks,
  (tasks): Task[] => tasks.filter((task) => task.complete)
)

export const selectInProgressTasks: (state: APP_STATE_TYPE) => Task[] =
  createSelector(selectTasks, (tasks): Task[] =>
    tasks.filter((tasks) => !tasks.complete)
  )
