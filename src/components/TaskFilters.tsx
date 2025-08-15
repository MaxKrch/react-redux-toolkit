import useFilter from '@/context/use-filter'

export const FILTER = {
  ALL: 'all',
  COMPLETED: 'completed',
  IN_PROGRESS: 'inProgress',
} as const

export type FILTER_TYPE = (typeof FILTER)[keyof typeof FILTER]

const TaskFiltres = () => {
  const { filter, setFilter } = useFilter()

  const baseClasses = 'cursor-pointer px-3 py-1 font-semibold rounded'
  const passiveFilter = `${baseClasses} bg-white text-blue-500 hover:bg-gray-100`
  const activeFilter = `${baseClasses} bg-blue-500 text-white hover:bg-blue-700`

  return (
    <ul className="w-full flex flex-wrap gap-5 px-3 py-1">
      <li
        className={filter === FILTER.ALL ? activeFilter : passiveFilter}
        onClick={() => setFilter(FILTER.ALL)}
      >
        Все
      </li>
      <li
        className={filter === FILTER.IN_PROGRESS ? activeFilter : passiveFilter}
        onClick={() => setFilter(FILTER.IN_PROGRESS)}
      >
        Незавершенные
      </li>
      <li
        className={filter === FILTER.COMPLETED ? activeFilter : passiveFilter}
        onClick={() => setFilter(FILTER.COMPLETED)}
      >
        Завершенные
      </li>
    </ul>
  )
}

export default TaskFiltres
