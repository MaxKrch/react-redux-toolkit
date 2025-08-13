import type { Task } from '@/components/TaskItem'
import type { APP_STATE_TYPE } from '../store'
import {
  selectCompletedTasks,
  selectInProgressTasks,
  selectTasks,
} from '../selectors'

describe('Store Selectors', () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Title 1',
      description: 'Description 1',
      complete: false,
    },
    { id: '2', title: 'Title 2', description: 'Description 2', complete: true },
    { id: '3', title: 'Title 3', description: 'Description 3', complete: true },
    {
      id: '4',
      title: 'Title 4',
      description: 'Description 4',
      complete: false,
    },
    {
      id: '5',
      title: 'Title 5',
      description: 'Description 5',
      complete: false,
    },
  ]

  const completedTasks: Task[] = [
    { id: '2', title: 'Title 2', description: 'Description 2', complete: true },
    { id: '3', title: 'Title 3', description: 'Description 3', complete: true },
  ]

  const inProgressTasks: Task[] = [
    {
      id: '1',
      title: 'Title 1',
      description: 'Description 1',
      complete: false,
    },
    {
      id: '4',
      title: 'Title 4',
      description: 'Description 4',
      complete: false,
    },
    {
      id: '5',
      title: 'Title 5',
      description: 'Description 5',
      complete: false,
    },
  ]

  const mockStore: APP_STATE_TYPE = {
    tasks,
  }

  it('should selectTasks return all tasks', () => {
    const received = selectTasks(mockStore)

    expect(received).toEqual(tasks)
  })

  it('should selectCompletedTasks return all tasks', () => {
    const received = selectCompletedTasks(mockStore)

    expect(received).toEqual(completedTasks)
  })

  it('should selectInProgressTasks return all tasks', () => {
    const received = selectInProgressTasks(mockStore)

    expect(received).toEqual(inProgressTasks)
  })
})
