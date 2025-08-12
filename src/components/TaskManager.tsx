import TaskFiltres from "./TaskFilters";
import TaskList from "./TaskList";
import TaskNew from "./TaskNew";

const TaskManager = () => {
    return(
        <div>
            <header>
                <TaskFiltres />
            </header>
            
            <main>
                <TaskList />
                <TaskNew />
            </main>
        </div>
    )
}

export default TaskManager;