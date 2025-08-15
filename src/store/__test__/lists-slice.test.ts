import listsReducer, {
  addList,
  addLists,
  listsSelectors,
  removeList,
  renameList,
} from '../slices/lists-slice'
import type { List } from '../types'

const makeList = (id: List['id']): List => ({
  id,
  title: `List ${id}`,
})

describe('tasksSlice', () => {
  ;(it('should return the initial state', () => {
    const result = listsReducer(undefined, { type: 'unnknown' })

    expect(result.ids).toEqual([])
    expect(result.entities).toEqual({})
  }),
    describe('listsReduces', () => {
      it('should handle addList', () => {
        const list = makeList('1')

        const result = listsReducer(undefined, addList(list))

        expect(result.ids).toEqual([`1`])
        expect(result.entities[list.id]).toEqual(list)
      })

      it('should handle addLists', () => {
        const lists = [makeList('1'), makeList('2')]

        const result = listsReducer(undefined, addLists(lists))

        expect(result.ids).toEqual([`1`, `2`])
        expect(result.entities[lists[0].id]).toEqual(lists[0])
        expect(result.entities[lists[1].id]).toEqual(lists[1])
      })

      it('should handle renameList', () => {
        const lists = [makeList('1'), makeList('2')]
        const newTitle = `New title`
        const initState = listsReducer(undefined, addLists(lists))

        const result = listsReducer(
          initState,
          renameList({ id: '1', title: newTitle })
        )

        expect(result.entities['1']?.title).toBe(newTitle)
      })

      it('should handle removeList', () => {
        const lists = [makeList('1'), makeList('2')]
        const initState = listsReducer(undefined, addLists(lists))

        const result = listsReducer(initState, removeList('1'))

        expect(result.ids).toEqual(['2'])
        expect(result.entities['2']).toBe(lists[1])
      })
    }),
    describe('tasksSelectors', () => {
      it('should select all lists', () => {
        const lists = [makeList('1'), makeList('2')]
        const state = {
          lists: listsReducer(undefined, addLists(lists)),
        } as any

        const allLists = listsSelectors.selectAll(state)

        expect(allLists).toEqual(lists)
      })

      it('should select list by id', () => {
        const lists = [makeList('1'), makeList('2')]
        const state = {
          lists: listsReducer(undefined, addLists(lists)),
        } as any

        const targetList = listsSelectors.selectById(state, '2')

        expect(targetList).toEqual(lists[1])
      })
    }))
})
