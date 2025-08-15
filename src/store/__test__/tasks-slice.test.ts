import { describe, it, expect } from 'vitest'
import tasksReducer, {
  addTask,
  addTasks,
  updateTask,
  toggleStatusTask,
  removeTask,
  tasksSelectors,
} from '../slices/tasks-slice'
import { removeList } from '../slices/lists-slice'
import type { Task } from '../types'

const makeTask = (id: string, listId = 'list-1', completed = false): Task => ({
  id,
  listId,
  title: `Title task ${id}`,
  description: `Task ${id}`,
  completed,
})

describe('tasksSlice reducer', () => {
  it('should return the initial state', () => {
    const initialState = tasksReducer(undefined, { type: 'unknown' })
    expect(initialState.ids).toEqual([])
    expect(initialState.entities).toEqual({})
  })

  it('should handle addTask', () => {
    const newTask = makeTask('1')
    const nextState = tasksReducer(undefined, addTask(newTask))

    expect(nextState.ids).toContain('1')
    expect(nextState.entities['1']).toEqual(newTask)
  })

  it('should handle addTasks', () => {
    const tasks = [makeTask('1'), makeTask('2')]
    const nextState = tasksReducer(undefined, addTasks(tasks))

    expect(nextState.ids).toHaveLength(2)
    expect(nextState.entities['1']).toEqual(tasks[0])
    expect(nextState.entities['2']).toEqual(tasks[1])
  })

  it('should handle updateTask', () => {
    const initialState = tasksReducer(undefined, addTask(makeTask('1')))
    const nextState = tasksReducer(
      initialState,
      updateTask({ id: '1', description: 'Updated task' })
    )

    expect(nextState.entities['1']?.description).toBe('Updated task')
  })

  it('should handle toggleStatusTask', () => {
    const initialState = tasksReducer(
      undefined,
      addTask(makeTask('1', 'list-1', false))
    )
    const toggledState = tasksReducer(initialState, toggleStatusTask('1'))

    expect(toggledState.entities['1']?.completed).toBe(true)
  })

  it('should handle removeTask', () => {
    const initialState = tasksReducer(undefined, addTask(makeTask('1')))
    const nextState = tasksReducer(initialState, removeTask('1'))

    expect(nextState.ids).not.toContain('1')
    expect(nextState.entities['1']).toBeUndefined()
  })

  it('should handle removeList (extraReducers)', () => {
    const tasks = [
      makeTask('1', 'list-1'),
      makeTask('2', 'list-2'),
      makeTask('3', 'list-1'),
    ]
    let state = tasksReducer(undefined, addTasks(tasks))

    state = tasksReducer(state, removeList('list-1'))

    expect(state.ids).toHaveLength(1)
    expect(state.entities['2']).toBeDefined()
    expect(state.entities['1']).toBeUndefined()
    expect(state.entities['3']).toBeUndefined()
  })
})

describe('tasksSelectors', () => {
  it('should select all tasks', () => {
    const tasks = [makeTask('1'), makeTask('2')]
    const state = {
      tasks: tasksReducer(undefined, addTasks(tasks)),
    } as any

    const allTasks = tasksSelectors.selectAll(state)
    expect(allTasks).toHaveLength(2)
    expect(allTasks[0].id).toBe('1')
  })

  it('should select task by id', () => {
    const tasks = [makeTask('1'), makeTask('2')]
    const state = {
      tasks: tasksReducer(undefined, addTasks(tasks)),
    } as any

    const task = tasksSelectors.selectById(state, '2')
    expect(task?.description).toBe('Task 2')
  })
})
