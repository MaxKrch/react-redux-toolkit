import { useAppDispatch } from '@/store/use-app-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import type { Task } from './TaskItem'
import { addTask } from '@/store/actions'

const TaskNew = () => {
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
    const task: Task = {
      id: crypto.randomUUID(),
      title: getValues('title'),
      description: getValues('description'),
      complete: false,
    }

    dispatch(addTask(task))

    reset({
      title: '',
      description: '',
    })
  }

  return (
    <form
      className="px-3 py-1 flex flex-col gap-3"
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

      <button
        className="px-3 py-1 min-w-[150px] bg-blue-500 text-white font-semibold uppercase cursor-pointer rounded mb-8 hover:bg-blue-700"
        type="submit"
      >
        Create Task
      </button>
    </form>
  )
}

export default TaskNew
