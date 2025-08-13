import type { Task } from '@/components/TaskItem'
import reducer, { initialState } from '../reducer'
import type { APP_STATE_TYPE } from '../store'
import { ACTION_TYPES } from '../types'

describe('tasks reducer', () => {
  const tasks: Task[] = [
    { id: '1', title: 'Title 1', description: 'Description 1', complete: true },
    { id: '2', title: 'Title 2', description: 'Description 2', complete: true },
  ]

  const mockStore: APP_STATE_TYPE = {
    tasks: tasks,
  }

  it('should return the initial state when no matching action is provided', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as any

    const received = reducer(undefined, unknownAction)

    expect(received).toEqual(initialState)
  })

  describe('ADD_TASK', () => {
    it('should add a new task to the state', () => {
      const task: Task = {
        id: '3',
        title: 'Title 3',
        description: 'Description 3',
        complete: true,
      }

      const addTaskAction = {
        type: ACTION_TYPES.ADD_TASK,
        payload: task,
      }

      const received = reducer(mockStore, addTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          complete: true,
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
        {
          id: '3',
          title: 'Title 3',
          description: 'Description 3',
          complete: true,
        },
      ])
    })
  })

  describe('UPDATE_TASK', () => {
    it('should update an existing task', () => {
      const task: Task = {
        id: '1',
        title: 'New Title',
        description: 'New Description',
        complete: true,
      }

      const updateTaskAction = {
        type: ACTION_TYPES.UPDATE_TASK,
        payload: task,
      }

      const received = reducer(mockStore, updateTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '1',
          title: 'New Title',
          description: 'New Description',
          complete: true,
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
      ])
    })

    it('should not change state if task ID does not match', () => {
      const task: Task = {
        id: '3',
        title: 'New Title',
        description: 'New Description',
        complete: true,
      }

      const updateTaskAction = {
        type: ACTION_TYPES.UPDATE_TASK,
        payload: task,
      }

      const received = reducer(mockStore, updateTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          complete: true,
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
      ])
    })
  })

  describe('REMOVE_TASK', () => {
    it('should remove a task by ID', () => {
      const removeTaskAction = {
        type: ACTION_TYPES.REMOVE_TASK,
        payload: '1',
      }

      const received = reducer(mockStore, removeTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
      ])
    })

    it('should not change state if task ID does not match', () => {
      const removeTaskAction = {
        type: ACTION_TYPES.REMOVE_TASK,
        payload: '3',
      }

      const received = reducer(mockStore, removeTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          complete: true,
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
      ])
    })
  })

  describe('TOGGLE_STATUS_TASK', () => {
    it('should toggle the "complete" status of a task', () => {
      const toggleStatusTaskAction = {
        type: ACTION_TYPES.TOGGLE_STATUS_TASK,
        payload: '1',
      }

      const received = reducer(mockStore, toggleStatusTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          complete: false,
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
      ])
    })

    it('should not change state if task ID does not match', () => {
      const toggleStatusTaskAction = {
        type: ACTION_TYPES.TOGGLE_STATUS_TASK,
        payload: '3',
      }

      const received = reducer(mockStore, toggleStatusTaskAction)

      expect(received.tasks).toEqual([
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          complete: true,
        },
        {
          id: '2',
          title: 'Title 2',
          description: 'Description 2',
          complete: true,
        },
      ])
    })
  })
})
