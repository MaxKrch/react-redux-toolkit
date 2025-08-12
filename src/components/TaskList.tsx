import { useState } from "react"
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

    const handleChange = (id: string, description: string) => {
               console.log(id, description)
    }
    const handleEdit = (id: string) => {
               console.log(id)
    }
    const handleCancel = (id: string) => {
               console.log(id)
    }
    const handleSave = (id: string) => {
               console.log(id)
    }
    

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
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <TaskItem 
                        task={editingTasks[task.id] ? editingTasks[task.id] : task}
                        isEditing={task.id in editingTasks}
                        onChange={handleChange}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TaskList