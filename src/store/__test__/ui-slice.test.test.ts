import { removeList } from '../slices/lists-slice'
import uiReducer, { setActiveList } from '../slices/ui-slice'

describe('uiSlice', () => {
  describe('reducers', () => {
    it('should return the initial state', () => {
      const initialState = uiReducer(undefined, { type: 'unknown' })
      expect(initialState).toEqual({
        activeListId: null,
      })
    })
    describe('setActiveList', () => {
      it('should set activeListId when it is different from the current one', () => {
        const result = uiReducer(undefined, setActiveList('1'))

        expect(result.activeListId).toBe('1')
      })

      it('should not change activeListId when payload is the same as current', () => {
        const initialState = { activeListId: '1' }
        const nextState = uiReducer(initialState, setActiveList('1'))

        expect(nextState.activeListId).toBe('1')
        expect(nextState).toBe(initialState)
      })

      it('should allow setting activeListId to null', () => {
        const initialState = { activeListId: '1' }
        const nextState = uiReducer(initialState, setActiveList(null))

        expect(nextState.activeListId).toBeNull()
      })
    })
  })

  describe('extraReducers', () => {
    describe('removeList', () => {
      it('should set activeListId to null if removed list is the active one', () => {
        const initialState = { activeListId: '1' }
        const result = uiReducer(initialState, removeList('1'))

        expect(result.activeListId).toBeNull()
      })

      it('should not change activeListId if removed list is not the active one', () => {
        const initialState = { activeListId: '1' }
        const result = uiReducer(initialState, removeList('2'))

        expect(result.activeListId).toBe('1')
      })
    })
  })
})
