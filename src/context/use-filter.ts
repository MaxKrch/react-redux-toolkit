import { useContext } from 'react'
import FilterContext from './filter-context'

const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) throw new Error('Missing filter context')

  return context
}

export default useFilter
