import { useCallback, useState } from "react"
import type { Task } from "./TaskItem"
import TaskItem from "./TaskItem"

const TaskList = () => {
    const [editingTasks, setEditingTask] = useState<{
        [key: Task['id']]:Task
    }>({
        '2': {
            id: '2',
            title: 'Third task',
            description: 'Third task description',
            complete: false,
        }
    })

    const handleChange = useCallback((id: string, description: string) => {
        if(!(id in editingTasks)) return;

        setEditingTask(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                description
            },
        }))
    }, [])

    const handleEdit = useCallback((id: string) => {
        const targetTask = tasks.find(task => task.id === id)
        if(!targetTask) return;

        setEditingTask(prev => ({
            ...prev,
            [id]: targetTask
        }))
    }, [])

    const handleCancel = useCallback((id: string) => {
        setEditingTask(prev => {
            const cloneTasks = {...prev}
            delete cloneTasks[id]

            return cloneTasks
        })
    }, [])

    const handleSave = useCallback((id: string) => {
        console.log(id)
    }, [])

    const handleRemove = useCallback((id: string) => {
        console.log(id)
    }, [])
    
    

    const tasks: Task[] = [
        {
            id: '0',
            title: 'First task',
            description: 'Firsts task description',
            complete: false,
        },
        {   
            id: '1',
            title: 'Second task',
            description: 'Second task description',
            complete: true,
        },
        {
            id: '2',
            title: 'Third task',
            description: 'Third task description',
            complete: false,
        }
    ]
    return(
        <ul className="flex flex-col gap-3 p-3">
            {tasks.map(task => (
                <li key={task.id}>
                    <TaskItem 
                        task={editingTasks[task.id] ? editingTasks[task.id] : task}
                        isEditing={task.id in editingTasks}
                        onChange={handleChange}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                        onSave={handleSave}
                        onRemove={handleRemove}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TaskList