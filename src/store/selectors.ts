import type { APP_STATE_TYPE } from './store'
import { createSelector } from 'reselect'
import type { List, Task } from './types'
import { listsSelectors } from './slices/lists-slice'
import { tasksSelectors } from './slices/tasks-slice'
import { FILTER, type FILTER_TYPE } from '@/components/TaskFilters'

export type TasksByListIdResult = Record<FILTER_TYPE, Task[]>

export const selectLists = listsSelectors.selectAll
export const selectTasks = tasksSelectors.selectAll
export const selectActiveListId = (state: APP_STATE_TYPE) =>
  state.ui.activeListId

export const selectTasksByListId = (id: List['id'] | null) =>
  createSelector(selectTasks, (tasks): TasksByListIdResult => {
    const result: TasksByListIdResult = {
      [FILTER.ALL]: [],
      [FILTER.COMPLETED]: [],
      [FILTER.IN_PROGRESS]: [],
    }

    if (id) {
      result[FILTER.ALL] = tasks.filter((task) => task.listId === id)
      result[FILTER.COMPLETED] = result[FILTER.ALL].filter(
        (task) => task.completed
      )
      result[FILTER.IN_PROGRESS] = result[FILTER.ALL].filter(
        (task) => !task.completed
      )
    }

    return result
  })
