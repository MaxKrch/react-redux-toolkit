import { FILTER, type FILTER_TYPE } from "@/components/TaskFilters";
import { createContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

export const FilterContext = createContext<{
    filter: FILTER_TYPE,
    setFilter: Dispatch<SetStateAction<FILTER_TYPE>>
} | undefined>(undefined)

const FilterProvider = ({children}: PropsWithChildren) => {
    const [filter, setFilter] = useState<FILTER_TYPE>(FILTER.ALL)

    return(
        <FilterContext.Provider value={{
            filter,
            setFilter
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider