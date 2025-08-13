import FilterProvider from '@/context/FilterProvider'
import TaskFiltres from './TaskFilters'
import TaskList from './TaskList'
import TaskNew from './TaskNew'

const TaskManager = () => {
  return (
    <FilterProvider>
      <div className="max-w-[1280px] min-w-[320px] w-[90%] min-h-[100vh] mx-auto bg-stone-50">
        <header>
          <TaskFiltres />
        </header>

        <main>
          <TaskList />
          <TaskNew />
        </main>
      </div>
    </FilterProvider>
  )
}

export default TaskManager
