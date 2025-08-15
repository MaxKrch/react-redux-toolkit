import { selectActiveListId, selectLists } from '@/store/selectors'
import { addList, removeList } from '@/store/slices/lists-slice'
import { setActiveList } from '@/store/slices/ui-slice'
import type { List } from '@/store/types'
import { useAppDispatch, useAppSelector } from '@/store/use-app-store'
import clsx from 'clsx'
import { useState, type ChangeEvent, type FormEvent } from 'react'

const TaskListsToggler = () => {
  const [newListTitle, setNewListTitle] = useState<string>('')
  const activeListId = useAppSelector(selectActiveListId)
  const taskLists = useAppSelector(selectLists)
  const dispatch = useAppDispatch()

  const handleChoiseList = (id: string) => {
    dispatch(setActiveList(id))
  }

  const handleRemoveList = (id: string) => {
    dispatch(removeList(id))
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewListTitle(event.target.value.trim())
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newList: List = {
      id: crypto.randomUUID(),
      title: newListTitle,
    }

    dispatch(addList(newList))
    dispatch(setActiveList(newList.id))
    setNewListTitle('')
  }

  return (
    <div className="flex gap-5 flex-wrap bg-white px-3 py-1">
      <form
        className="flex items-center rounded border border-blue-500"
        onSubmit={handleSubmit}
      >
        <label htmlFor="newListTitle" className="sr-only">
          New List Task Title
        </label>
        <input
          className="outline-none px-3 py-1"
          onChange={handleChangeTitle}
          id="newListTitle"
          type="text"
          placeholder="New List"
          value={newListTitle}
        />
        <button
          disabled={newListTitle.length === 0}
          aria-label="Create New List"
          className="cursor-pointer px-3 py-1 bg-blue-500 text-white font-semibold hover:bg-blue-700 disabled:cursor-auto disabled:bg-gray-200"
          type="submit"
        >
          ✔
        </button>
      </form>
      <ul className="contents">
        {taskLists.map((taskList) => (
          <li
            className="flex items-center border border-blue-500 rounded font-semibold"
            key={taskList.id}
          >
            <div
              className={clsx({
                'px-3 py-1 border-r cursor-pointer': true,
                'text-blue-500 hover:bg-gray-100': taskList.id !== activeListId,
                'bg-blue-500 text-white hover:bg-blue-700':
                  taskList.id === activeListId,
              })}
              onClick={() => handleChoiseList(taskList.id)}
            >
              {taskList.title}
            </div>
            <button
              className={clsx({
                'px-3 py-1 cursor-pointer': true,
                'text-blue-500 hover:bg-gray-100': taskList.id !== activeListId,
                'bg-blue-500 text-white hover:bg-blue-700':
                  taskList.id === activeListId,
              })}
              aria-label="Delete List"
              onClick={() => handleRemoveList(taskList.id)}
            >
              ⨉
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskListsToggler
