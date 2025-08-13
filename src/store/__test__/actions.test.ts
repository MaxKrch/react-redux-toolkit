import type { Task } from '@/components/TaskItem'
import { ACTION_TYPES } from '../types'
import { addTask, removeTask, toggleStatusTask, updateTask } from '../actions'

describe('Store: Actions', () => {
  const mockTask: Task = {
    id: 'testId',
    title: 'Test title',
    description: 'Test description',
    complete: false,
  }

  it('addTask should return correct object', () => {
    const expected = {
      type: ACTION_TYPES.ADD_TASK,
      payload: mockTask,
    }

    const received = addTask(mockTask)

    expect(received).toEqual(expected)
  })

  it('updateTask should return correct object', () => {
    const expected = {
      type: ACTION_TYPES.UPDATE_TASK,
      payload: mockTask,
    }

    const received = updateTask(mockTask)

    expect(received).toEqual(expected)
  })

  it('removeTask should return correct object', () => {
    const expected = {
      type: ACTION_TYPES.REMOVE_TASK,
      payload: mockTask.id,
    }

    const received = removeTask(mockTask.id)

    expect(received).toEqual(expected)
  })

  it('togleStatusTask should return correct object', () => {
    const expected = {
      type: ACTION_TYPES.TOGGLE_STATUS_TASK,
      payload: mockTask.id,
    }

    const received = toggleStatusTask(mockTask.id)

    expect(received).toEqual(expected)
  })
})
