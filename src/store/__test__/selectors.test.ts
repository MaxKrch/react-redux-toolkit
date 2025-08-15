import uiReducer, { setActiveList } from '../slices/ui-slice'
import listsReducer, { addLists } from '../slices/lists-slice'
import tasksReducer, { addTasks } from '../slices/tasks-slice'

import type { APP_STATE_TYPE } from '../store'
import {
  selectActiveListId,
  selectLists,
  selectTasks,
  selectTasksByListId,
  type TasksByListIdResult,
} from '../selectors'
import type { List, Task, UI } from '../types'
import { FILTER } from '@/components/TaskFilters'

describe('Store Selectors', () => {
  const ui: UI = { activeListId: '1' }
  const allLists: List[] = [
    { id: '1', title: 'List 1' },
    { id: '2', title: 'List 2' },
  ]
  const allTasks: Task[] = [
    {
      id: '1',
      title: 'Title 1',
      listId: '1',
      description: 'Description 1',
      completed: false,
    },
    {
      id: '2',
      title: 'Title 2',
      listId: '1',
      description: 'Description 2',
      completed: true,
    },
    {
      id: '3',
      title: 'Title 3',
      listId: '2',
      description: 'Description 3',
      completed: false,
    },
    {
      id: '4',
      title: 'Title 4',
      listId: '2',
      description: 'Description 4',
      completed: true,
    },
    {
      id: '5',
      title: 'Title 5',
      listId: '1',
      description: 'Description 5',
      completed: false,
    },
  ]

  const taskByListId: Task[] = [
    {
      id: '1',
      title: 'Title 1',
      listId: '1',
      description: 'Description 1',
      completed: false,
    },
    {
      id: '2',
      title: 'Title 2',
      listId: '1',
      description: 'Description 2',
      completed: true,
    },
    {
      id: '5',
      title: 'Title 5',
      listId: '1',
      description: 'Description 5',
      completed: false,
    },
  ]

  const completedTasksByListId: Task[] = [
    {
      id: '2',
      title: 'Title 2',
      listId: '1',
      description: 'Description 2',
      completed: true,
    },
  ]

  const inProgressTasksByListId: Task[] = [
    {
      id: '1',
      title: 'Title 1',
      listId: '1',
      description: 'Description 1',
      completed: false,
    },
    {
      id: '5',
      title: 'Title 5',
      listId: '1',
      description: 'Description 5',
      completed: false,
    },
  ]

  const mockStore: APP_STATE_TYPE = {
    tasks: tasksReducer(undefined, { type: 'init' }),
    lists: listsReducer(undefined, { type: 'init' }),
    ui: uiReducer(undefined, { type: 'init' }),
  }

  mockStore.tasks = tasksReducer(mockStore.tasks, addTasks(allTasks))
  mockStore.lists = listsReducer(mockStore.lists, addLists(allLists))
  mockStore.ui = uiReducer(mockStore.ui, setActiveList('1'))

  describe('selectors', () => {
    it('should selectTasks return all tasks', () => {
      const received = selectTasks(mockStore)

      expect(received).toEqual(allTasks)
    })

    it('should selectLists return all lis', () => {
      const received = selectLists(mockStore)

      expect(received).toEqual(allLists)
    })

    it('should selectActiveListId return activeListId', () => {
      const received = selectActiveListId(mockStore)

      expect(received).toEqual(ui.activeListId)
    })
  })

  describe('Reselectors', () => {
    it('should selectTasksByListId return all tasks, when passed id', () => {
      const expected: TasksByListIdResult = {
        [FILTER.ALL]: taskByListId,
        [FILTER.COMPLETED]: completedTasksByListId,
        [FILTER.IN_PROGRESS]: inProgressTasksByListId,
      }
      const received = selectTasksByListId('1')(mockStore)

      expect(received).toEqual(expected)
    })

    it('should sselectTasksByListId return empty tasks, when not passed id', () => {
      const expected: TasksByListIdResult = {
        [FILTER.ALL]: [],
        [FILTER.COMPLETED]: [],
        [FILTER.IN_PROGRESS]: [],
      }
      const received = selectTasksByListId(null)(mockStore)

      expect(received).toEqual(expected)
    })
  })
})
