import type { EntityState } from '@reduxjs/toolkit'
import { SLICE_NAMES } from './consts'

export type List = { id: string; title: string }
export type Task = {
  id: string
  title: string
  description: string
  completed: boolean
  listId: string
}

export type UI = {
  activeListId: string | null
}

export type STATE_TYPE = {
  [SLICE_NAMES.LISTS]: EntityState<List, List['id']>
  [SLICE_NAMES.TASKS]: EntityState<Task, Task['id']>
  [SLICE_NAMES.UI]: UI
}
