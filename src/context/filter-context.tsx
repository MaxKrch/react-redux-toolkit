import { type FILTER_TYPE } from '@/components/TaskFilters'
import { createContext, type Dispatch, type SetStateAction } from 'react'

const FilterContext = createContext<
  | {
      filter: FILTER_TYPE
      setFilter: Dispatch<SetStateAction<FILTER_TYPE>>
    }
  | undefined
>(undefined)

export default FilterContext
