import { FILTER, type FILTER_TYPE } from "@/components/TaskFilters"
import { useState, type PropsWithChildren } from "react"
import FilterContext from "./filter-context"

const FilterProvider = ({ children }: PropsWithChildren) => {
  const [filter, setFilter] = useState<FILTER_TYPE>(FILTER.ALL)

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider