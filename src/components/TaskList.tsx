import { useCallback, useState } from 'react'
import type { Task } from './TaskItem'
import TaskItem from './TaskItem'
import { useAppDispatch, useAppSelector } from '@/store/use-app-store'
import { selectTasks } from '@/store/selectors'
import { removeTask, updateTask } from '@/store/actions'

const TaskList = () => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const [editingTasks, setEditingTask] = useState<{
    [key: Task['id']]: Task
  }>({})

  const handleChange = useCallback((id: string, description: string) => {
    if (!(id in editingTasks)) return

    setEditingTask((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        description,
      },
    }))
  }, [editingTasks])

  const handleEdit = useCallback((id: string) => {
    const targetTask = tasks.find((task) => task.id === id)

    if (!targetTask) return

    setEditingTask((prev) => ({
      ...prev,
      [id]: targetTask,
    }))
  }, [tasks])

  const handleCancel = useCallback((id: string) => {
    setEditingTask((prev) => {
      const cloneTasks = { ...prev }
      delete cloneTasks[id]

      return cloneTasks
    })
  }, [])

  const handleSave = useCallback((id: string) => {
    const targetTask = editingTasks[id]
    if (!targetTask) return

    dispatch(updateTask(targetTask))

    setEditingTask((prev) => {
      const cloneTasks = { ...prev }
      delete cloneTasks[id]
      return cloneTasks
    })
  }, [dispatch, editingTasks])

  const handleRemove = useCallback((id: string) => {
    dispatch(removeTask(id))
  }, [dispatch])

  return (
    <ul className="flex flex-col gap-3 p-3">
      {tasks.map((task) => (
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
