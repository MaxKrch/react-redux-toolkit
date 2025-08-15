import { memo, useEffect, useRef } from 'react'
import TaskButton from './TaskButton'
import clsx from 'clsx'
import { useAppDispatch } from '@/store/use-app-store'
import type { Task } from '@/store/types'
import { toggleStatusTask } from '@/store/slices/tasks-slice'

type TaskProps = {
  task: Task
  isEditing: boolean
  onChange: (id: string, description: string) => void
  onEdit: (id: string) => void
  onCancel: (id: string) => void
  onSave: (id: string) => void
  onRemove: (id: string) => void
}

const TaskItem = ({
  task,
  isEditing,
  onChange,
  onEdit,
  onCancel,
  onSave,
  onRemove,
}: TaskProps) => {
  const dispatch = useAppDispatch()
  const descriptionElement = useRef<HTMLDivElement | null>(null)
  const debounceChange = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = () => {
    if (!descriptionElement.current) return
    if (debounceChange.current) clearTimeout(debounceChange.current)
    debounceChange.current = setTimeout(() => sendChange(), 500)
  }

  const sendChange = () => {
    if (!descriptionElement.current) return
    onChange(task.id, descriptionElement.current.textContent.trim() ?? '')
  }

  const toggleStatus = () => {
    if (isEditing) return
    dispatch(toggleStatusTask(task.id))
  }

  useEffect(() => {
    if (descriptionElement.current) {
      descriptionElement.current.textContent = task.description
    }
  }, [task.description])

  useEffect(() => {
    return () => {
      if (debounceChange.current) clearTimeout(debounceChange.current)
    }
  }, [])

  const mainButtonConfig = isEditing
    ? { title: 'Save', onClick: () => onSave(task.id) }
    : { title: 'Edit', onClick: () => onEdit(task.id) }

  const secondButtonConfig = isEditing
    ? {
        title: 'Cancel',
        onClick: () => {
          if (descriptionElement.current)
            descriptionElement.current.textContent = task.description
          onCancel(task.id)
        },
      }
    : { title: 'Delete', onClick: () => onRemove(task.id) }

  const buttonClasses =
    'px-3 py-1 uppercase cursor-pointer font-semibold min-w-32'
  const mainButtonClasses = `${buttonClasses} bg-blue-500 text-white rounded border border-blue-500 hover:bg-blue-700`
  const secondButtonClasses = `${buttonClasses} bg-white text-blue-500 rounded border border-blue-500 hover:bg-gray-50`

  return (
    <article className="rounded bg-white shadow">
      <div
        className={clsx({
          'flex justify-between items-center px-3 py-1': true,
          'bg-green-100': !task.completed,
          'bg-gray-300': task.completed,
        })}
      >
        <h3
          className={clsx({
            'font-semibold': true,
            'line-through': task.completed,
          })}
        >
          {task.title}
        </h3>
        <div
          onClick={toggleStatus}
          className="flex gap-1 items-center cursor-pointer"
        >
          <div>completed:</div>
          <div className="w-5 h-5 bg-white rounded-full text-green-800 flex justify-center items-center">
            {task.completed && '✓'}
          </div>
        </div>
      </div>
      <div
        className={clsx({
          'px-3 py-1 min-h-[50px]': true,
          'outline-none border border-gray-300 bg-gray-50': isEditing,
          'border border-white': !isEditing,
        })}
        ref={descriptionElement}
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        onInput={handleChange}
      ></div>
      <div className="flex justify-end gap-3 bg-gray-100 px-3 py-1">
        <TaskButton classes={mainButtonClasses} {...mainButtonConfig} />
        <TaskButton classes={secondButtonClasses} {...secondButtonConfig} />
      </div>
    </article>
  )
}

export default memo(TaskItem)
