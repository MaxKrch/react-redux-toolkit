import { vi, type Mock } from 'vitest'
import { logger } from '../middlewares'

describe('logger middleware', () => {
  let store: any
  let next: Mock
  let action: any

  beforeEach(() => {
    store = {
      getState: vi.fn(() => ({ test: 'state' })),
    }
    next = vi.fn()
    action = { type: 'TEST_ACTION' }

    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should call next(action)', () => {
    logger(store)(next)(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  it('log action и state', () => {
    logger(store)(next)(action)

    expect(console.log).toHaveBeenCalledWith('Action: ', action)
    expect(console.log).toHaveBeenCalledWith('New state: ', { test: 'state' })
  })
})
