import { useAppDispatch, useAppSelector } from '@/store/use-app-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { memo } from 'react'
import { selectActiveListId } from '@/store/selectors'
import type { Task } from '@/store/types'
import { addTask } from '@/store/slices/tasks-slice'

const TaskNew = () => {
  const activeListId = useAppSelector(selectActiveListId)
  const dispatch = useAppDispatch()
  const schema = z.object({
    title: z.string().min(3, 'Short title').max(25, 'Long title'),
    description: z.string().max(255, 'Long description'),
  })
  type Schema = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const handleCreateTask = () => {
    if (activeListId == null) return

    const task: Task = {
      id: crypto.randomUUID(),
      title: getValues('title'),
      listId: activeListId,
      description: getValues('description'),
      completed: false,
    }

    dispatch(addTask(task))

    reset({
      title: '',
      description: '',
    })
  }

  return (
    <form
      className="px-3 py-1 flex flex-col gap-1"
      onSubmit={handleSubmit(handleCreateTask)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title:</label>
        <input
          {...register('title')}
          className="bg-white px-3 py-1 outline-none border border-gray-300 rounded"
          name="title"
          id="title"
          type="text"
        />
        <div className="min-h-6 text-red-500 font-semibold text-sm">
          {errors.title && errors.title.message}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description:</label>
        <textarea
          {...register('description')}
          className="bg-white px-3 py-1 outline-none border border-gray-300 rounded resize-none min-h-[250px]"
          name="description"
          id="description"
        ></textarea>
        <div className="min-h-6 text-red-500 font-semibold text-sm">
          {errors.description && errors.description.message}
        </div>
      </div>
      <div className="min-h-6 text-red-500 font-semibold text-sm">
        {activeListId === null && 'Select or create a task list'}
      </div>

      <button
        className="px-3 py-1 min-w-[150px] bg-blue-500 text-white font-semibold uppercase cursor-pointer rounded mb-8 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-auto"
        type="submit"
        disabled={
          activeListId === null ||
          !!errors.title?.message ||
          !!errors.description?.message
        }
      >
        Create Task
      </button>
    </form>
  )
}

export default memo(TaskNew)
